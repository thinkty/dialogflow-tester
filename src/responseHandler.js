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
  const messages = parseKeywords(queryResult.fulfillmentMessages);
  const action = queryResult.action; // Can be undefined if not provided
  const outputContexts = queryResult.outputContexts;

  // Edit this part to send your own response
  return {
    fulfillmentMessages: createFulfillmentMessages(action, userInput, messages),
    outputContexts: handleContextWithAction(action, userInput, outputContexts),
    // followupEventInput: {
    //   name: "doesnotexist",
    //   languageCode: lang
    // }
  };
}


const keywords = {
  name: "Bob"
};

/**
 * Parse the keywords (words wrapped in brackets {}) and replace them
 * with appropriate values.
 * 
 * @param {Array} messages Messages to parse the keywords from
 */
function parseKeywords(messages) {

  // Iterate through each message object
  return messages.map(message => {

    // Iterate through each text message (usually 1)
    for (let i = 0; i < message.text.text.length; i++) {
      let rawMessage = message.text.text[i];
      const keys = rawMessage.match(/[^{}]+(?=})/g);

      // If there are keywords, it will be caught by the regex
      if (keys == null) {
        return message;
      }

      // Replace the keywords with the appropriate value
      keys.forEach(key => {
        const regex = new RegExp(`{${key}}`, "g");
        rawMessage = rawMessage.replace(regex, keywords[key]);
      });
      return {
        text: {
          text: [
            rawMessage
          ]
        }
      }
    }
  });
}


/**
 * If action is defined, form output context based on the input.
 * If action is not defined, pass on the given contexts.
 * 
 * @param {String}  action Defined by the intent
 * @param {String}   input User input
 * @param {Array} contexts Default output contexts of the intent
 */
function handleContextWithAction(action, input, contexts) {

  if (!action) {
    return contexts;
  }

  if (action === 'checkAttendance') {
    if (input.length > 5) {
      return contexts;
    } else {
      return resetContext(contexts);
    }
  } else {
    return contexts;
  }

}


/**
 * If action is defined, form fulfillment messages based on the input.
 * If aciton is not defined, pass on the messages
 * 
 * @param {String}  action Defined by the intent
 * @param {String}   input User input
 * @param {Array} messages Default messgaes of the intent
 */
function createFulfillmentMessages(action, input, messages) {

  if (!action) {
    return messages;
  }

  if (action === 'checkAttendance') {
    if (input.length > 5) {
      return [
        {
          text: {
            text: [
              "Hello!"
            ]
          }
        }
      ];
    } else {
      return messages;
    }
  } else {
    return [
      {
        text: {
          text: [
            `Unrecognized action: ${action}`
          ]
        }
      }
    ];
  }
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