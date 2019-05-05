from six.moves import input
from googlevoice import Voice, settings
import pickle
import sys
import json
from bs4 import BeautifulSoup

from TextValidator import validate_data
import requests

import pickle
import requests

def file_get_contents(filename):
    with open(filename) as f:
        return f.read()


voice = Voice()
with (open('session.bin', 'rb')) as openfile:
    voice.session = pickle.load(openfile)

voice.login(email=file_get_contents('user'), passwd=file_get_contents('secret'))

def send_new_msg(number):
    # not just the men, but the women and children too
    shelters = requests.get("http://codefest-2019.herokuapp.com/api/shelters/getCurrentDay")
    shelterjson = shelters.json()

    food = requests.get("http://codefest-2019.herokuapp.com/api/food/getCurrentDay")
    foodjson = food.json()

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

    voice.send_sms(number, txtmsg)

def extractsms(htmlsms) :
    """
    extractsms  --  extract SMS messages from BeautifulSoup tree of Google Voice SMS HTML.

    Output is a list of dictionaries, one per message.
    """
    msgitems = []										# accum message items here
    #	Extract all conversations by searching for a DIV with an ID at top level.
    tree = BeautifulSoup(htmlsms, features="html.parser")			# parse HTML into tree
    conversations = tree.findAll("div",attrs={"id" : True, "class" : "goog-flat-button gc-message gc-message-unread gc-message-sms"},recursive=False)
    for conversation in conversations :
        #	For each conversation, extract each row, which is one SMS message.
        rows = conversation.findAll(attrs={"class" : "gc-message-sms-row"})
        row = rows[-1]								# for all rows
        #	For last row, which is one message, extract all the fields.
        msgitem = {"id" : conversation["id"]}		# tag this message with conversation ID
        spans = row.findAll("span",attrs={"class" : True}, recursive=False)
        for span in spans :							# for all spans in row
            t = span["class"]
            cl = span["class"][0].replace('gc-message-sms-', '')
            msgitem[cl] = (" ".join(span.findAll(text=True))).strip()	# put text in dict
        if msgitem["from"] != "Me:":
            msgitems.append(msgitem)					# add msg dictionary to list
    return msgitems

def run():
       
    while True:
        try:
            cleared_ids = []
            voice.inbox()
            data = extractsms(voice.inbox.html)
            for item in data:
                cleared_ids.append(item["id"])
                number =  item["from"][2:-1]
                text = item["text"]
                parsed_text = validate_data(text)
                gender = parsed_text["gender"]
                kids = parsed_text["kids"]
                #voice.send_sms(number, f"hello! gender: {gender} and # children: {kids}") # put node call here
                postdata = { 'number': number,
                             'gender': gender,
                             'dependents': kids }
                stopdata = { 'number': number }

                findnum = requests.post("http://codefest-2019.herokuapp.com/api/guests/find", data = stopdata)
                checksum = len(findnum.json())

                if parsed_text['stop'] and checksum == 1:
                    voice.send_sms(number, "Your number has been removed from GimmeShelter")
                    requests.delete("http://codefest-2019.herokuapp.com/api/guests/remove", data = stopdata)
                elif checksum == 0:
                    voice.send_sms(number, "You have signed up for GimmeShelter!")
                    requests.post("http://codefest-2019.herokuapp.com/api/guests/", data = postdata)
                    send_new_msg(number)
                else:
                    voice.send_sms(number, "Sorry, I did not understand your message. Text 'STOP' to stop messages or text your gender (and number of children, if applicable) to sign up for GimmeShelter.")

            for message in voice.inbox().messages:
                if message.id in cleared_ids and not message.isRead:
                    message.mark() # mark as read
        except Exception as e:
            print(e)
            quit()

__name__ == '__main__' and run()
