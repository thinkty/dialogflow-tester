'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import handler from './src/requestHandler.js';
import ngrok from 'ngrok';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/webhook', (req, res) => {
  return handler(req, res);
});

app.listen(port, async () => {
  console.log(`API tester listening on port ${port}`);
  const url = await ngrok.connect(port);
  console.log(`ngrok connected : ${url}`);
});