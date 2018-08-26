"""
Googlevoice interactive application. Invoke with python -m googlevoice.
"""

from __future__ import print_function

from sys import exit
from atexit import register
from optparse import OptionParser
from pprint import pprint

from six.moves import input

from googlevoice.voice import Voice
from googlevoice.util import LoginError

parser = OptionParser(usage='''gvoice [options] commands
    Where commands are

    login (li) - log into the voice service
    logout (lo) - log out of the service and make sure session is deleted
    help

    Voice Commands
        call (c) - call an outgoing number from a forwarding number
        cancel (cc) - cancel a particular call
        download (d) - download mp3 message given id hash
        send_sms (s) - send sms messages

    Folder Views
        search (se)
        inbox (i)
        voicemail (v)
        starred (st)
        all (a)
        spam (sp)
        trash (t)
        voicemail (v)
        sms (sm)
        recorded (r)
        placed (p)
        received (re)
        missed (m)''')
parser.add_option("-e", "--email", dest="email", default=None,
                  help="Google Voice Account Email")
parser.add_option("-p", "--password", dest='passwd', default=None,
                  help='Your account password (prompted if blank)')
parser.add_option(
    "-b", "--batch", dest='batch', default=False, action="store_true",
    help='Batch operations, asking for no interactive input')


def login(email, passwd, batch):
    """
    Login Voice instance based on options and interactivity
    """
    global voice
    try:
        voice.login(email, passwd)
    except LoginError:
        if batch:
            print('Login failed.')
            exit(0)
        if input('Login failed. Retry?[Y/n] ').lower() in ('', 'y'):
            login(None, None, batch)
        else:
            exit(0)


def logout():
    global voice
    print('Logging out of voice...')
    voice.logout()


def pprint_folder(name):
    folder = getattr(voice, name)()
    print(folder)
    pprint(folder.messages, indent=4)


def main():
    options, args = parser.parse_args()

    try:
        action, args = args[0], args[1:]
    except IndexError:
        action = 'interactive'

    if action == 'help':
        print(parser.usage)
        exit(0)

    voice = Voice()
    login()

    register(logout)

    if action == 'interactive':
        while 1:
            try:
                action = input('gvoice> ').lower().strip()
            except (EOFError, KeyboardInterrupt):
                exit(0)
            if not action:
                continue
            elif action in ('q', 'quit', 'exit'):
                break
            elif action in ('login', 'li'):
                login()
            elif action in ('logout', 'lo'):
                voice.logout()
            elif action in ('call', 'c'):
                voice.call(
                    input('Outgoing number: '),
                    input('Forwarding number [optional]: ') or None,
                    int(
                        input(
                            'Phone type [1-Home, 2-Mobile, 3-Work, 7-Gizmo]:'
                        ) or 2)
                )
                print('Calling...')
            elif action in ('cancelcall', 'cc'):
                voice.cancel()
            elif action in ('sendsms', 's'):
                voice.send_sms(input('Phone number: '), input('Message: '))
                print('Message Sent')
            elif action in ('search', 'se'):
                se = voice.search(input('Search query: '))
                print(se)
                pprint(se.messages)
            elif action in ('download', 'd'):
                print(
                    'MP3 downloaded to %s'
                    % voice.download(input('Message sha1: ')))
            elif action in ('help', 'h', '?'):
                print(parser.usage)
            elif action in ('trash', 't'):
                pprint_folder('trash')
            elif action in ('spam', 'sp'):
                pprint_folder('spam')
            elif action in ('inbox', 'i'):
                pprint_folder('inbox')
            elif action in ('voicemail', 'v'):
                pprint_folder('voicemail')
            elif action in ('all', 'a'):
                pprint_folder('all')
            elif action in ('starred', 'st'):
                pprint_folder('starred')
            elif action in ('missed', 'm'):
                pprint_folder('missed')
            elif action in ('received', 're'):
                pprint_folder('received')
            elif action in ('recorded', 'r'):
                pprint_folder('recorded')
            elif action in ('sms', 'sm'):
                pprint_folder('sms')
    else:
        if action == 'send_sms':
            try:
                num, args = args[0], args[1:]
            except Exception:
                print('Please provide a message')
                exit(0)
            args = (num, ' '.join(args))
        getattr(voice, action)(*args)


__name__ == '__main__' and main()
