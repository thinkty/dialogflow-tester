'use strict';

import fs from 'fs';
import { getTime } from './util.js';

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
      fs.writeFileSync(`${requestDir}/req-${getTime()}.json`, JSON.stringify(request));
    }

    if (process.env.testing === 'res') {
      // Send your own response
      const resp = createResponse(req.body);

      // Save the response to a file
      if (!fs.existsSync(resposneDir)) {
        fs.mkdirSync(resposneDir);
      }
      fs.writeFileSync(`${resposneDir}/res-${getTime()}.json`, JSON.stringify(resp));

      res.json(resp);
      return;
    }
    res.sendStatus(200);

  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
};

/**
 * Edit this function to create your own response 
 * Reference: https://cloud.google.com/dialogflow/docs/fulfillment-webhook#webhook_response
 * 
 * @param {*} body Request body from Dialog Flow
 */
function createResponse(body) {
  const session = body.session;
  const queryResult = body.queryResult;
  const userInput = queryResult.queryText;
  const originalRes = queryResult.fulfillmentText;
  const action = queryResult.action; // Can be undefined if not provided
  const lang = queryResult.languageCode;

  // Edit this part to send your own response
  return {
    fulfillmentMessages: [
      {
        text: {
          text: [
            "You just said: ",
            `${userInput}`
          ],
          text: [
            `I was suppose to say: ${originalRes}`
          ]
        }
      }
    ],
    // outputContexts: [
    //   {
    //     name: `${session}/contexts/exampleContext`,
    //     lifespanCount: 3
    //   }
    // ],
    // followupEventInput: {
    //   name: "doesnotexist",
    //   languageCode: lang
    // }
  };
}