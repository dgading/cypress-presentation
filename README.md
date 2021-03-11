# Cypress Presentation

## What is this?
This is just a set of commits to build a couple simple Cypress tests for the DKAN homepage.

## What this is not
A complete how to on Cypress. It just breaks up a few of the common things I use when working with Cypress. See the Cypress docs for a complete how to.

## What's in this?
There are 6 branches in this repo and each adds to the next until you get to what is in the `main` branch.
1. `add-cypress` This is where the adventure starts.
2. `start-dkan-test` Add a new spec and start testing a real site.
3. `testing-library` Switch to using testing-library for accessing dom nodes
4. `topic-tests` Look a couple of ways to loop over some icon links and test them in different ways using a fixture
5. `user-interactions` Test out the hero on DKAN homepage
6. `axe-testing` Add Cypress axe and setup some custom commands, including one for Cypress Axe and 2 to simplify the Hero tests

And that's it. This will all fail if the DKAN homepage ever changes. 