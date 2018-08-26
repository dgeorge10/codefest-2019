import os

from six.moves import input

from googlevoice import Voice


class VoiceTest:
    voice = Voice()
    voice.login()
    outgoing = input('Outgoing number (blank to ignore call tests): ')
    forwarding = None
    if outgoing:
        forwarding = input('Forwarding number [optional]: ') or None

    if outgoing:
        def test_1call(self):
            self.voice.call(self.outgoing, self.forwarding)

        def test_sms(self):
            self.voice.send_sms(self.outgoing, 'i sms u')

        def test_2cancel(self):
            self.voice.cancel(self.outgoing, self.forwarding)

    def test_special(self):
        assert self.voice.special

    def test_inbox(self):
        assert self.voice.inbox

    def test_balance(self):
        assert self.voice.settings['credits']

    def test_search(self):
        assert len(self.voice.search('joe'))

    def test_disable_enable(self):
        self.voice.phones[0].disable()
        self.voice.phones[0].enable()

    def test_download(self):
        msg = list(self.voice.voicemail.messages)[0]
        fn = '%s.mp3' % msg.id
        if os.path.isfile(fn):
            os.remove(fn)
        self.voice.download(msg)
        assert os.path.isfile(fn)

    def test_zlogout(self):
        self.voice.logout()
        self.voice.special is None

    def test_config(self):
        from conf import config
        config.forwardingNumber
        str(config.phoneType) in '1237'
        assert config.get('wtf') is None
