import re
import logging
import getpass

from .conf import config
from . import settings
from . import util

from six.moves import input

import requests

if settings.DEBUG:
    logging.basicConfig(level=logging.DEBUG)

log = logging.getLogger(__name__)

class Voice(object):
    """
    Main voice instance for interacting with the Google Voice service
    Handles login/logout and most of the baser HTTP methods
    """

    user_agent = 'PyGoogleVoice/0.5'

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': self.user_agent})

        for name in settings.FEEDS:
            setattr(self, name, self.__get_xml_page(name))

    ######################
    # Some handy methods
    ######################
    def special(self):
        """
        Returns special identifier for your session (if logged in)
        """
        if getattr(self, '_special', None):
            return self._special
        pattern = re.compile(r"('_rnr_se':) '(.+)'")
        resp = self.session.get(settings.INBOX).text
        try:
            sp = pattern.search(resp).group(2)
        except AttributeError:
            sp = None
        self._special = sp
        return sp
    special = property(special)

    def login(self, email=None, passwd=None):
        """
        Login to the service using your Google Voice account
        Credentials will be propmpted for if not given as args or in the ``~/.gvoice`` config file
        """
        if hasattr(self, '_special') and getattr(self, '_special'):
            return self

        email = email or config.email or input('Email address: ')
        passwd = passwd or config.password or getpass.getpass()

        content = self.__do_page('login').text
        # holy hackjob
        matcher = re.compile(r"name=\"GALX\".*?value=\"(.+?)\"", re.DOTALL)
        galx = matcher.search(content).group(1)
        assert len(galx) < 20
        self.__do_page('login', {'Email': email, 'Passwd': passwd, 'GALX': galx})

        del email, passwd

        try:
            assert self.special
        except (AssertionError, AttributeError):
            raise util.LoginError

        return self

    def logout(self):
        """
        Logs out an instance and makes sure it does not still have a session
        """
        self.__do_page('logout')
        del self._special
        assert self.special is None
        return self

    def call(self, outgoingNumber, forwardingNumber=None, phoneType=None, subscriberNumber=None):
        """
        Make a call to an ``outgoingNumber`` from your ``forwardingNumber`` (optional).
        If you pass in your ``forwardingNumber``, please also pass in the correct ``phoneType``
        """
        if forwardingNumber is None:
            forwardingNumber = config.forwardingNumber
        if phoneType is None:
            phoneType = config.phoneType

        self.__validate_special_page('call', {
            'outgoingNumber': outgoingNumber,
            'forwardingNumber': forwardingNumber,
            'subscriberNumber': subscriberNumber or 'undefined',
            'phoneType': phoneType,
            'remember': '1'
        })

    __call__ = call

    def cancel(self, outgoingNumber=None, forwardingNumber=None):
        """
        Cancels a call matching outgoing and forwarding numbers (if given).
        Will raise an error if no matching call is being placed
        """
        self.__validate_special_page('cancel', {
            'outgoingNumber': outgoingNumber or 'undefined',
            'forwardingNumber': forwardingNumber or 'undefined',
            'cancelType': 'C2C',
        })

    def phones(self):
        """
        Returns a list of ``Phone`` instances attached to your account.
        """
        return [util.Phone(self, data) for data in self.contacts['phones'].values()]
    phones = property(phones)

    def settings(self):
        """
        Dict of current Google Voice settings
        """
        return util.AttrDict(self.contacts['settings'])
    settings = property(settings)

    def send_sms(self, phoneNumber, text):
        """
        Send an SMS message to a given ``phoneNumber`` with the given ``text`` message
        """
        self.__validate_special_page('sms', {'phoneNumber': phoneNumber, 'text': text})

    def search(self, query):
        """
        Search your Google Voice Account history for calls, voicemails, and sms
        Returns ``Folder`` instance containting matching messages
        """
        data = dict(q=query)
        return self.__get_xml_page('search', data=data)()

    def download(self, msg, adir=None):
        """
        Download a voicemail or recorded call MP3 matching the given ``msg``
        which can either be a ``Message`` instance, or a SHA1 identifier.
        Saves files to ``adir`` (defaults to current directory).
        Message hashes can be found in ``self.voicemail().messages`` for example.
        Returns location of saved file.
        """
        from os import path,getcwd
        if isinstance(msg, util.Message):
            msg = msg.id
        assert util.is_sha1(msg), 'Message id not a SHA1 hash'
        if adir is None:
            adir = getcwd()
        url = self.__resolve_page('download')
        url += msg
        try:
            resp = self.__do_url(url)
            resp.raise_for_status()
        except:
            raise util.DownloadError
        fn = path.join(adir, '%s.mp3' % msg)
        fo = open(fn, 'wb')
        fo.write(resp.raw_content)
        fo.close()
        return fn

    def contacts(self):
        """
        Partial data of your Google Account Contacts related to your Voice account.
        For a more comprehensive suite of APIs, check out http://code.google.com/apis/contacts/docs/1.0/developers_guide_python.html
        """
        if hasattr(self, '_contacts'):
            return self._contacts
        self._contacts = self.__get_xml_page('contacts')()
        return self._contacts
    contacts = property(contacts)

    ######################
    # Helper methods
    ######################

    def __resolve_page(self, page):
        return getattr(settings, page.upper())

    def __do_page(self, page, data=None, headers=None):
        """
        Loads a page out of the settings and request it using requests.
        Return Response.
        """
        return self.__do_url(self.__resolve_page(page), data, headers)

    def __do_url(self, url, data=None, headers=None):
        log.debug('url is %s', url)
        log.debug('data is %s', data)
        method = 'POST' if data else 'GET'
        resp = self.session.request(method, url, data=data, headers=headers)
        return resp

    def __validate_special_page(self, page, data={}, **kwargs):
        """
        Validates a given special page for an 'ok' response
        """
        data.update(kwargs)
        util.load_and_validate(self.__do_special_page(page, data))

    _Phone__validate_special_page = __validate_special_page

    def __do_special_page(self, page, data=None, headers={}):
        """
        Add self.special to request data
        """
        assert self.special, 'You must login before using this page'
        if isinstance(data, tuple):
            data += ('_rnr_se', self.special)
        elif isinstance(data, dict):
            data.update({'_rnr_se': self.special})
        return self.__do_page(page, data, headers)

    _Phone__do_special_page = __do_special_page

    def __get_xml_page(self, page, data=None, headers={}):
        """
        Return XMLParser instance generated from given page
        """
        def getter():
            page_name = 'XML_%s' % page.upper()
            return self.__do_special_page(page_name, data, headers).text
        return util.XMLParser(self, page, getter)

    def __messages_post(self, page, *msgs, **kwargs):
        """
        Performs message operations, eg deleting,staring,moving
        """
        data = kwargs.items()
        for msg in msgs:
            if isinstance(msg, util.Message):
                msg = msg.id
            assert util.is_sha1(msg), 'Message id not a SHA1 hash'
            data += (('messages',msg),)
        return self.__do_special_page(page, dict(data))

    _Message__messages_post = __messages_post
