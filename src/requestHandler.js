'use strict';

import fs from 'fs';
import { getTime } from './util.js';

const requestDir = 'webhookRequestLogs';
const resposneDir = 'sampleResponseLogs'; // TODO: change to webhookResponseLogs

export default function handleRequest(req, res) {
  try {

    const request = {
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
    };

    if (process.env.testing === 'req') {
      if (!fs.existsSync(requestDir)) {
        fs.mkdirSync(requestDir);
      }
      fs.writeFileSync(`${requestDir}/intent-${getTime()}.json`, JSON.stringify(request));
    }


    // TODO: format response    

    res.sendStatus(200);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
};