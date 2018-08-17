import setuptools


params = dict(
    name="googlevoice",
    version='1.0',
    url='https://github.com/jaraco/pygooglevoice',
    author='Jason R. Coombs',
    author_email='jaraco@jaraco.com',
    description='Python Interface for Google Voice',
    packages=['googlevoice'],
    install_requires=['six', 'requests'],
)

if __name__ == '__main__':
    setuptools.setup(**params)
