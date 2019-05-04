"""
Simple script to startup a python interpreter after
logging into the voice service.

Local variable `voice` is set as the main Voice instance.

Invoke with python -m googlevoice.interact
"""

import textwrap
import code

from . import Voice


banner = textwrap.dedent("""
    You are now using Google Voice in the interactive python shell
    Try 'help(voice)' for more info
    """).lstrip()


def main():
    voice = Voice()
    voice.login()

    code.interact(banner=banner, local=locals())


__name__ == '__main__' and main()
