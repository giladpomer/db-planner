# DB Planner [![Build Status](https://travis-ci.org/giladshapira/db-planner.svg?branch=master)](https://travis-ci.org/giladshapira/db-planner)
Simple &amp; Customizable Database Tables Planner

Plan databases of applications, save them as local JSON files and generate matching files using this data.

## Try it now!
DB Planner is available [here](http://ec2-52-10-222-33.us-west-2.compute.amazonaws.com/db-planner)

## Features
 + Plan the database structure (tables & columns)
 + Generate matching files for each table
 + Edit templates online
 
 ## Setup local environment
 ### Run on your machine
 > In order to avoid cross origin problems we will use a Node.js local server
 + Install [Node.js](http://nodejs.org/)
 + Install http-server using [npm](https://www.npmjs.com/)
   ```sh
   npm install http-server -g
   ```
 + Navigate to the root folder of the _DB Planner_ app. for ex.
   ```sh
   cd "C:\Projects\db-planner"
   ```
 + Start a http-server on port 3000 (every time you want to start the app)
   ```sh
   http-server -a localhost -p 3000
   ```
   Or run in a new window (non-blocking command):
   ```sh
   start http-server -a localhost -p 3000
   ```
 + Navigate on your browser to http://localhost:3000/
 
 ### Run E2E tests using [Protractor](http://www.protractortest.org/)
 > The tests will run automatically after pushing to GitHub using [Travis CI](https://travis-ci.org/giladshapira/db-planner/branches). This section is for running the tests on your machine
 
 > This section assumes you have already completed **Run on your machine** section and you are currently running a version of the app
 + Install [Java Development Kit (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
 + Install Protractor using [npm](https://www.npmjs.com/)
   ```sh
   npm install -g protractor
   ```
 + Update & start the webdriver in the background (every time the webdriver is not running)
   ```sh
   webdriver-manager update
   webdriver-manager start --standalone -passthru
   ```
 + Navigate to the root folder of the _DB Planner_ app. for ex.
   ```sh
   cd "C:\Projects\db-planner"
   ```
 + Run the tests on Chrome (every time you want to run the tests)
   ```sh
   protractor ./test/protractor.conf.js
   ```
 
 ## Templates
 ### Available templates
 + Android (Java) & Sqlite
  
 ### Add a new template
 + Create a branch from `master` with the name of the template. for ex. `android-sqlite`
 + Create a template folder: add a folder with the name of the template to the [templates](./templates) folder. for ex. [templates/Android_SQLite](./templates/Android_SQLite)
 + Add the template folder name to the `templateFolders` array located in [templatesService.js](./js/services/templatesService.js)
 + Add a `template.txt` file to the template folder (can be an empty file). for ex. [templates/Android_SQLite/template.txt](./templates/Android_SQLite/template.txt)
 + Add a `config.js` file to the template folder. for ex. [templates/Android_SQLite/config.js](./templates/Android_SQLite/config.js)
   
   The simplest `config.js` file should have at least:
   ```javascript
   var config = {
    title: 'Android (Java) & Sqlite', // Title of the template tab
    databaseEditorLanguage: 'sql', // Code editor language for the database
    objectsEditorLanguage: 'java', // Code editor language for the objects
    objectFileExtension: 'java', // The file extension when downloading the objects

    methods: {
        createTable: function () { // Genarate create table statement for each table
            return "CREATE TABLE STATEMENT";
        }
     }
   }
   ```
   For a complete list of supported languages for the ACE code editor take a look at `supportedModes` in [ext-modelist.js](https://github.com/ajaxorg/ace-builds/blob/master/src/ext-modelist.js)


## Libraries used
 + [AngularJS](https://github.com/angular/angular.js)
 + [AngularJS Material](https://github.com/angular/material)
 + [UI.Ace](https://github.com/angular-ui/ui-ace)

