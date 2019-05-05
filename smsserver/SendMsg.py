from six.moves import input
from googlevoice import Voice

def file_get_contents(filename):
    with open(filename) as f:
        return f.read()

def run():
    voice = Voice()
    voice.login(email="mastergamer159@gmail.com", passwd=file_get_contents('secret'))

    phoneNumber = '6038516078'
    text = ''

    voice.send_sms(phoneNumber, text)


__name__ == '__main__' and run()