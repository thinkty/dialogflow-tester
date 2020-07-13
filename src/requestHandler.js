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

    // Generate your own response
    const response = generateResponse(request.body);

    // Save the response to a local file
    if (process.env.testing === 'res') {
      if (!fs.existsSync(resposneDir)) {
        fs.mkdirSync(resposneDir);
      }
      fs.writeFileSync(
        `${resposneDir}/res-${getTime()}.json`, JSON.stringify(response)
      );
    }
    // Send response to DialogFlow
    res.json(response);
    return;

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};