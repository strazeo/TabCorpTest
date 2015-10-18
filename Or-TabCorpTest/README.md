# TabCorpTest

Coding exercise
------------
Program to calculate the dividends for a simplified form of Tote betting for Tabcorp.

Implementation
------------
I've developed the program in a modular way that will allow me to easily extend it if needed in the future.
While I didn't write interfaces directly, this design allows to make use of interfaces to replace the validator, parser and betting rules.
As done with TDD, once I had a skeleton of which modules I wanted to use I started writing tests that would fail and write the code in the module after.

bettingApplication.js
------------
This file contains the main application.
As mentioned before, I didn't develop proper interfaces but the constructor is built around accepting interfaces for a parser, validator, bettingEngine and outputStream.

stdinParser.js
------------
This is the parser for normal stdin, example of other options are: json parser, xml parser etc.
The "interface" only needs to implement the function 'processInput' which accepts an array of lines retrieved by the input and return an array of valid lines.
In this case the array is created by splitting the lines on the ':' delimiter

validator.js
------------
This is the validator for this exercise, this is mainly for separation of concerns and not for extendibility.
The "interface" needs to implement 2 functions:
'validateResult' return a Result object on valid input, and null on invalid input. 
'validateBets' returns an array, it's either empty for invalid input or full of valid Bet objects.

horseBetting.js
------------
This is the betting engine (betting rules).
the "interface" only needs to implement the function 'execute' which accepts an array of valid Bet objects, a single valid Result object and the output stream

Finishing touches
------------
app.js is the starting point of the application, simply creates an interface to get stdin input and once all input is read launch the main application.
I've also implemented a simple logger.

Tests
------------
The tests folder contains test for the 3 modules (I've done only Unit Testing and no integration testing therefore no tests for the main application).
Since you requested no extra modules I made use of the ExportRunner TestFramework which is recognized by visual studio to execute the tests.
With little change the syntax can be adjusted for any node.js TestFramework (such as Mocha for example).

Example execution with windows CMD
------------
From the directory that contains app.js:
```
node app.js < ExampleInput.txt
```
