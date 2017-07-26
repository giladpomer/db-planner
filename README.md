# DB Planner [![Build Status](https://travis-ci.org/giladshapira/db-planner.svg?branch=master)](https://travis-ci.org/giladshapira/db-planner)
Simple &amp; Customizable Database Tables Planner

Plan databases of applications, save them as local JSON files and generate matching files using this data.

## Try it now!
DB Planner is available at http://giladshapira.com/db-planner

## Features
 + Plan the database structure (tables & columns)
 + Generate matching files for each table
 + Edit templates online
 
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
 + https://github.com/angular/angular.js
 + https://github.com/angular/material/tree/v1.1.4
 + https://github.com/angular-ui/ui-ace

