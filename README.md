# sockInit

[![Code Climate](https://codeclimate.com/github/sockinit/sockinit/badges/gpa.svg)](https://codeclimate.com/github/sockinit/sockinit)
[![Test Coverage](https://codeclimate.com/github/sockinit/sockinit/badges/coverage.svg)](https://codeclimate.com/github/sockinit/sockinit/coverage)
[![Issue Count](https://codeclimate.com/github/sockinit/sockinit/badges/issue_count.svg)](https://codeclimate.com/github/sockinit/sockinit)
[![Codecrystal](https://img.shields.io/badge/code-crystal-5CB3FF.svg)](http://codecrystal.herokuapp.com/crystalise/tu6619/sockinit/master)
[![Build Status](https://travis-ci.org/sockinit/sockinit.svg?branch=master)](https://travis-ci.org/sockinit/sockinit)

## What?
sockInit provides live, real-time chat in a friendly and open environment. To join the room, simply enter or re-enter your unique username of choice.

## How?
sockInit stores the usernames in a set of redis hashes. Real-time chatting is enabled through use of sockets.

## Stretch Goals
Functionality to store usernames, passwords, number of visits and number of messages has been included on the back-end to spice up the user's experience in the future.

## Wireframe

![wireframe](http://s22.postimg.org/908coqkfl/wireframe.png)

## This Is Our Flow

![ourflow](assets/IMG_4842.JPG)

## References

* Stackoverflow [discussion](http://stackoverflow.com/questions/6196647/want-to-store-in-redis-via-node-js) on using Redis with Node.
