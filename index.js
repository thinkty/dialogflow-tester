'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './src/requestHandler.js';
import ngrok from 'ngrok';
import handleRequest from './src/requestHandler.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  handleRequest(req, res);
});

app.listen(port, async () => {
  console.log(`API tester listening on port ${port}`);
  console.log(`Testing for ${
      (process.env.testing === 'req')
      ? 'requests'
      : 'responses'
    } from Dialog Flow`
  );
  const url = await ngrok.connect(port);
  console.log(`ngrok connected : ${url}`);
});