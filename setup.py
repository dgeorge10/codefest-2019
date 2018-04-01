import setuptools


README = """Python Google Voice
====================

Based on "pygooglevoice" by Joe McCall & Justin Quick

Exposing the Google Voice "API" to the Python language
-------------------------------------------------------

Google Voice for Python Allows you to place calls, send sms, download voicemail, and check the various folders of your Google Voice Accounts.
You can use the Python API or command line script to schedule calls, check for new recieved calls/sms, or even sync your recorded voicemails/calls.
Works for Python 2 and Python 3

Full documentation is available up at http://sphinxdoc.github.com/pygooglevoice/
"""

setup_params = dict(
    name="googlevoice",
    use_scm_version=True,
    url='https://github.com/jaraco/pygooglevoice/tree/fork-googlevoice',
    author='Jason R. Coombs',
    author_email='jaraco@jaraco.com',
    description='Python Interface for Google Voice',
    long_description=README,
    packages=['googlevoice'],
    scripts=['bin/gvoice', 'bin/asterisk-gvoice-setup', 'bin/gvi'],
    install_requires=['six', 'requests'],
    setup_requires=['setuptools_scm'],
)

if __name__ == '__main__':
    setuptools.setup(**setup_params)
