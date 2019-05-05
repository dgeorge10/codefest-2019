from six.moves import input
from googlevoice import Voice

def file_get_contents(filename):
    with open(filename) as f:
        return f.read()

def run(msg, numbers):
    voice = Voice()
    voice.login(email="mastergamer159@gmail.com", passwd=file_get_contents('secret'))

    for number in numbers:
        try:
            voice.send_sms(number, msg)
        except Exception:
            print(f"Failed sending {msg} for {number}")
            continue


__name__ == '__main__' and run("Hello world", ['6038516078', '4849650473'])