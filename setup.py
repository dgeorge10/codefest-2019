import setuptools


params = dict(
    name="googlevoice",
    version='1.0',
    url='https://github.com/jaraco/pygooglevoice',
    author='Jason R. Coombs',
    author_email='jaraco@jaraco.com',
    description='Python Interface for Google Voice',
    packages=['googlevoice'],
    scripts=['bin/gvoice', 'bin/asterisk-gvoice-setup', 'bin/gvi'],
    install_requires=['six', 'requests'],
)

if __name__ == '__main__':
    setuptools.setup(**params)
