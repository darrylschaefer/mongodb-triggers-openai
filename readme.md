## MongoDB Atlas Triggers with OpenAI API.

### Overview

This repository contains scripts to integrate MongoDB Atlas Triggers with the OpenAI API. This enables you to perform actions with the OpenAI API in response to database events. There are example scripts provided for making "Chat" and "Completions" requests to OpenAI.

### Pre-Requisites:

1. MongoDB Atlas cluster with credentials.
2. OpenAI API key.

### Files Overview:

- `chat.js`: Template for OpenAI "Chat" API requests within MongoDB triggers.
- `completions.js`: Template for OpenAI "Completions" API requests within MongoDB triggers.

Both templates are placeholders, and you should replace the predefined values with your own specific information. Store your OpenAI API key in the "values" tab of your app services, using the key name "openaiApiKey". If you prefer to use a different key name, update the scripts accordingly. 

### More Information

For more information on MongoDB Atlas triggers, refer to the official documentation: 
- MongoDB Atlas Triggers: https://docs.atlas.mongodb.com/triggers/
