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
  let outputContexts = resetContext(queryResult.outputContexts);


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
    outputContexts: outputContexts,
    // followupEventInput: {
    //   name: "doesnotexist",
    //   languageCode: lang
    // }
  };
}


/**
 * To reset the context, one can set the pre-existing output contexts'
 * lifespanCount to 0.
 * 
 * @see https://github.com/dialogflow/dialogflow-fulfillment-nodejs/issues/50
 * @param {Array} contexts Contexts parsed from the query result
 * @returns {Array} Output contexts with 0 lifespan count 
 */
function resetContext(contexts) {
  if (!contexts || contexts.length === 0) {
    return null;
  }

  let resettedContexts = [];
  contexts.forEach(context => {
    resettedContexts.push({
      name: context.name,
      lifespanCount: 0
    });
  });

  return resettedContexts;
}