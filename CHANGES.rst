2.0.2
=====

Fixed more bugs in the implementation, revealed by an enhanced
test suite.

2.0.1
=====

* #2: Fixed bugs in login. Confirmed ``examples/sms.py`` works
  again.

2.0
===

Rebased code on upstream pygooglevoice.

Removed scripts, replaced with runnable modules invokable with
``python -m``:

 - googlevoice
 - googlevoice.interact
 - googlevoice.setup-asterisk

Added test suite via tox and pytest, although currently only imports
and lint are tested.

Automated releases via Travis-CI.

Renamed GitHub repo to jaraco/googlevoice.
