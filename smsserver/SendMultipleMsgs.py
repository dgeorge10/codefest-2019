from six.moves import input
from googlevoice import Voice
import pickle
import requests

def file_get_contents(filename):
    with open(filename) as f:
        return f.read()

voice = Voice()
with (open('session.bin', 'rb')) as openfile:
    voice.session = pickle.load(openfile)
voice.login(email=file_get_contents('user'), passwd=file_get_contents('secret'))

def send(msg, numbers):
    for number in numbers:
        try:
            voice.send_sms(number, msg)
        except Exception:
            #print(f"Failed sending {msg} for {number}")
            continue

def run():
    # not just the men, but the women and children too
    shelters = requests.get("http://codefest-2019.herokuapp.com/api/shelters/getCurrentDay")
    shelterjson = shelters.json()

    food = requests.get("http://codefest-2019.herokuapp.com/api/food/getCurrentDay")
    foodjson = food.json()

    allusers = requests.get("http://codefest-2019.herokuapp.com/api/guests/")
    alljson = allusers.json()
    nums = []
    for item in alljson:
        nums.append(item['number'])

    txtmsg = "Shelters open today:\n\n"
    for shelter in shelterjson:
        for key in shelter:
            txtmsg += shelter[key] + "\n"
        txtmsg += "\n"
    txtmsg += "\nFood resources available:\n\n"
    for f in foodjson:
        for key in f:
            txtmsg += f[key] + "\n"
        txtmsg += "\n"
    send(txtmsg, nums)

__name__ == '__main__' and run()
