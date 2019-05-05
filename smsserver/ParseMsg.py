from six.moves import input
from googlevoice import Voice, settings

import sys
import json
from bs4 import BeautifulSoup

from TextValidator import validate_data

settings.FEEDS
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

def file_get_contents(filename):
    with open(filename) as f:
        return f.read()

def run():
    voice = Voice()
    voice.login(email=file_get_contents('user'), passwd=file_get_contents('secret'))

    while True:
        cleared_ids = []
        voice.inbox()
        data = extractsms(voice.inbox.html)
        for item in data:
            cleared_ids.append(item["id"])
            number =  item["from"][2:-1]
            text = item["text"]
            print(number)
            parsed_text = validate_data(text)
            gender = parsed_text["gender"]
            kids = parsed_text["kids"]
            voice.send_sms(number, f"hello! gender: {gender} and # children: {kids}") # put node call here

        for message in voice.inbox().messages:
            if message.id in cleared_ids and not message.isRead:
                message.mark() # mark as read

__name__ == '__main__' and run()