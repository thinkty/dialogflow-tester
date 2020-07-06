'use strict';

import fs from 'fs';
import { getTime } from './util.js';
import generateResponse from './responseHandler.js';

const requestDir = 'webhookRequestLogs';
const resposneDir = 'webhookResponseLogs';

/**
 * Handle requests from Dialog Flow
 * 
 * @param {*} req 
 * @param {*} res 
 */
export default function handleRequest(req, res) {
  try {

    const request = {
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
    };

    // Save the request to a file 
    if (process.env.testing === 'req') {
      if (!fs.existsSync(requestDir)) {
        fs.mkdirSync(requestDir);
      }
      fs.writeFileSync(
        `${requestDir}/req-${getTime()}.json`, JSON.stringify(request)
      );
    }

    if (process.env.testing === 'res') {
      // Generate your own response
      const resp = generateResponse(request.body);

      // Save the response to a local file
      if (!fs.existsSync(resposneDir)) {
        fs.mkdirSync(resposneDir);
      }
      fs.writeFileSync(
        `${resposneDir}/res-${getTime()}.json`, JSON.stringify(resp)
      );

      // Send response to DialogFlow
      res.json(resp);
      return;
    }
    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};