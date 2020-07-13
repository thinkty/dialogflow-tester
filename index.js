'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './src/requestHandler.js';
import ngrok from 'ngrok';
import handleRequest from './src/requestHandler.js';

const app = express();
const port = 3003;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// According to the guides, DialogFlow will send a POST request
// https://cloud.google.com/dialogflow/docs/fulfillment-webhook#webhook_request
app.post('/', (req, res) => {
  handleRequest(req, res);
});

app.get('/', (req, res) => {
  res.send(
    `You have used the GET method to see this page, 
    FYI, DialogFlow will use the POST method to make requests.`
  );
});

app.listen(port, async () => {
  console.log(`API tester listening on port ${port}`);
  const url = await ngrok.connect(port);
  console.log(`ngrok connected : ${url}`);
});