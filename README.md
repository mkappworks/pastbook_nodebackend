# Node Backend for a Image Gallery App

A nodejs server for a simple image gallery with authenticated login. It consists of: a Node.js server (this repository)

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


---

## Install

    $ git clone https://github.com/mkappworks/pastbook_mernapp.git
    $ cd pastbook_mernapp
    $ npm install

## Running the project in dev mode

    $ npm run dev

## Running the project

    $ npm run start

## Simple build for production

    $ npm run build

## Environment Variables

Add a .env file in the root directory and set the following environment variables:

    $ DB_CONNECTION_USER_ID : user name/id of the mongo database

    $ DB_CONNECTION_PASSWORD : password of the mongo database

    $ PASSWORD_PASSPHRASE : password passphrase used to decrypt the encrypted password from the client side. It should be identical to the one used in the client side

    $ ACCESS_TOKEN_SECRET : secret phrase used to generate and verify the access token

    $ REFRESH_TOKEN_SECRET : secret phrase used to generate and verify the rehresh token
    
## Swagger API Documentation

To open Swagger API Documentation run the backend server in dev mode.
Then open the docs from your browser in following url : 
    http://localhost:4000/api-docs/

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                                                  |
| **src**                  | Contains  source code that will be compiled to the dist dir                                     |
| **src/config**           | Application configuration                                                                       |        
| **src/controller**       | Express middlewares which process the incoming requests before handling them down to the routes |
| **src/route**            | Contain all express routes, separated by module/area of application                             |                       
| **src/model**            | Models define schemas that will be used in storing and retrieving data from Application database|
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)|
