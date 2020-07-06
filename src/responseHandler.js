'use strict';

/**
 * Edit this function to create your own response 
 * Reference: https://cloud.google.com/dialogflow/docs/fulfillment-webhook#webhook_response
 * 
 * @param {*} body Request body from DialogFlow's request
 */
export default function generateResponse(body) {
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