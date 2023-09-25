# Chat-App

Just description here

## Table of Contents

1. [Deployment](#deployment)
2. [Environment Variables](#environment-variables)
3. [Brief Description](#brief-description)
4. [Features](#features)
5. [Screenshots](#screenshots)
6. [Demo](#demo)
7. [Feedback](#feedback)

## Brief Description

## Deployment

To run this project, proceed with the following steps:

1. Fork this repository
2. Clone this repository in your local code editor (preferably VS Code)

3. Install the required

## Environment Variables

To run this project, you will need to get your own `Client ID` from [Google Cloud Console](https://console.cloud.google.com).

Create an account in Google Cloud Console

<img src='./images/deployment/google-cloud-console.png' alt='Google Could Console' style='display:block;margin-left:auto;margin-right:auto;width:50%;'>
<p style='text-align:center'>Google Could Console</p>

Go to APIs and Services

<img src='./images/deployment/apis-and-services.png' alt='APIs and Services' style='display:block;margin-left:auto;margin-right:auto;width:50%;'>
<p style='text-align:center'>APIs and Services</p>

Then, in the Credentials section -> Create Credentials -> OAuth client ID

<img src='./images/deployment/credentials.png' alt='Credentials Section' style='display:block;margin-left:auto;margin-right:auto;width:50%;'>
<p style='text-align:center'>Credentials Section</p>

<img src='./images/deployment/create-client-id.png' alt='Create OAuth Client ID' style='display:block;margin-left:auto;margin-right:auto;width:50%;'>
<p style='text-align:center'>Create OAuth Client ID</p>

Create your own `Client ID` and insert it in the project directory _/chat-app/client/src/components/login/Login.js_ as shown:

<img src='./images/deployment/insert-client-id.png' alt='Insert your Client ID' style='display:block;margin-left:auto;margin-right:auto;width:50%;'>
<p style='text-align:center'>Insert your Client ID</p>

## Languages Used

- React.js - for developing the front-end part of the project

- Node.js - for developing the back-end part of the project

- SQL - for managing databases in the project

## Dependencies and Libraries Used

- [js-cookie](https://www.npmjs.com/package/js-cookie) - to simplify management of Cookies

  `npm i js-cookie`

- [jwt-decode](https://www.npmjs.com/package/jwt-decode) - for authentication and authorization of user

  `npm i jwt-decode`

- [react-icons](https://www.npmjs.com/package/react-icons) - for including popular styled icons

  `npm i react-icons`

- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - for using React Router in web applications

  `npm i react-router-dom`

- [express](https://www.npmjs.com/package/express) - fast, unopinionated, minimalist web framework for Node.js

  `npm i express`

- [cors](https://www.npmjs.com/package/cors) - for providing a Express middleware that can be used to enable CORS (Cross-Origin Resource Sharing) with various options

  `npm i cors`

- [socket.io](https://www.npmjs.com/package/socket.io) - for handling incoming connections from clients, managing WebSocket communication, and emitting events to connected clients

  `npm i socket.io`

- [socket.io-client](https://www.npmjs.com/package/socket.io-client) - to establish connections to a Socket.IO server, emit events to the server, and listen for events sent from the server

  `npm i socket.io-client`

- [sqlite3](https://www.npmjs.com/package/sqlite3) - for managing Relational Databases (Relational Database Management System(RDBMS))

  `npm i sqlite3`

## Documentation

Refer to the below given respective documentations for the languages used to build this project.

- [Documentation for React.js](https://legacy.reactjs.org/docs/getting-started.html)

- [Documentation for Node.js](https://nodejs.org/en/docs)

- [Documentation for SQL](https://dev.mysql.com/doc/)

## Features

-
-
-

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
Some description about this screenshot.

## Demo

Insert gif or link to demo

## Feedback

If you have any feedback, please reach me out at ramcharanvakkalanka@gmail.com
