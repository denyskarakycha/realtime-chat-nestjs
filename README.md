<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Backend application for RealTime Chat. REST API + WebSocket. 
Dump file located in the file structure.

[RealTime Chat](https://chat-wtkedtopsq-uc.a.run.app)

## Documentation

Main endpoints:

https://chat-wtkedtopsq-uc.a.run.app/api/docs

*documentation is being finalized

## Installation

```bash
$ yarn install
```

## Running the app

Before running the application, be sure to configure .env.stage.dev and .env.stage.prod and specify your values for .env.

Before running the application to specify:
STAGE= prod | dev

To run on your port, specify:
PORT= [your_port]

```bash

# development
$ STAGE=dev yarn run start:dev

# production 
$ STAGE=prod yarn run start:prod
```
## Docker setup

The port for the application is configured through process.env.PORT. The default port is 8080.
For the docker to configure the port:

ARG PORT=your_port
ENV PORT=${PORT}

Example:

```bash
# Creating docker image
$ docker build -t chat .

# Docker start
$ docker run -p 8888:8080 chat
```

## Postman

The collection for testing the application is located in the root file structure (Realtime Chat.postman_collection.json)

{{prod_url}} - global variable link to the project domain (https://chat-wtkedtopsq-uc.a.run.app)

For convenient testing of the application, the database already stores user-created chats and chat histories.

Exapmles:

Accounts: Logan, Emily, Emma, Lucas, Jackson
Password: 1#.QwE - FOR EVERYONE

Conversation: 
- id: d099b977-374d-43b4-b859-f85602ea4132
- Creator: Emily
- Participans: 
  Emily (AccountId: 90cd53f2-da63-4e91-8719-3765a6f8938a)
  Jackson (AccountId: c086eec9-1dc2-4642-9ab8-abb25fc23019)

!! When sending a message, the ID of either a conversation or personal message is indicated and the type of chat is required.

Direct:
- id: 8b148656-5452-45ae-b634-9343f0d1b6b4
- members: 
  Emily (AccountId: 90cd53f2-da63-4e91-8719-3765a6f8938a)
  Jackson (AccountId: c086eec9-1dc2-4642-9ab8-abb25fc23019)

!! When creating a new Direct, ACCOUNTID must be specified in the params.

## Postman WebSocket

For testing WebSocket:

When connecting to a chat (room).

Example: 

- Sending in JSON format(Message):

```json
{
    "chatId": "d099b977-374d-43b4-b859-f85602ea4132",
    "chatType": "CONVERSATION"
}
```

- Events to which you subscribe Client (Socket.IO):

  __UnauthorizedException__
  __AccessTokenUpdate__
  __JoinException__
  __NewMessage__

- Headers: 
  Authorization  Bearer __client_token__

- SubscribeMessage: 

  __joinChat__

Response after connection in the form of JSON with chat history

When sending a message.

Example: 

- Sending in JSON format(Message):

```json
{
    "text": "Hello from WS",
    "chatId": "d099b977-374d-43b4-b859-f85602ea4132",
    "chatType": "CONVERSATION",
    "date": "current_date"
}
```

 "date": "current_date" - must be today's date

- Events to which you subscribe Client (Socket.IO):

  __UnauthorizedException__
  __AccessTokenUpdate__
  __JoinException__
  __NewMessage__

- Headers: 
  Authorization  Bearer __client_token__

- SubscribeMessage: 

  __sendMessage__

Response after connection in the form of JSON with chat history or current dialog

*postman does not support export for websocket 




