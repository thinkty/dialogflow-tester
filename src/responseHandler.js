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

  // Edit this part to send your own response
  return {
    fulfillmentMessages: createFulfillmentMessages(action, userInput, messages),
    outputContexts: handleContext(queryResult),
    // followupEventInput: {
    //   name: "doesnotexist",
    //   languageCode: lang
    // }
  };
}

// Sample keywords
const keywords = {
  name: "Bob"
};

// Sample intents
const LOOP_FALLBACK = 1;
const intentMap = {
  "WakeUp-220": LOOP_FALLBACK,
  "Finish-220": LOOP_FALLBACK
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
 * Handle the output contexts. If action is provided, it needs to make a
 * decision based on the user input and send the appropriate output contexts.
 * If action is not provided, it should make its decision based on the intent 
 * name.
 * 
 * @param {Object} queryResult Fulfillment request from DialogFlow
 */
function handleContext(queryResult) {

  const userInput = queryResult.queryText;
  const action = queryResult.action;
  const outputContexts = queryResult.outputContexts;
  const intentName = queryResult.intent.displayName;

  if (action) {
    return handleContextWithAction(action, userInput, outputContexts);
  }

  // Action not provided
  return handleContextWithIntentName(intentName, outputContexts);
}

/**
 * If action is defined, form output context based on the user input.
 * 
 * @param {String}  action Defined by the intent
 * @param {String}   input User input
 * @param {Array} contexts Default output contexts of the intent
 */
function handleContextWithAction(action, input, contexts) {

  if (action === 'checkAttendance' || action === 'checkRecordForToday') {
    if (input.length > 5) {
      return contexts;
    } else {
      return resetContext(contexts);
    }
  }
  
  return contexts;
}


/**
 * Form output context based on the intent name
 * 
 * @param {String} intentName Display name of the intent
 * @param {Array}    contexts Default output contexts of the intent
 */
function handleContextWithIntentName(intentName, contexts) {

  // If the given intent name is defined, handle it based on the map
  if (intentMap[intentName]) {
    if (intentMap[intentName] === LOOP_FALLBACK) {
      return extendContext(contexts);
    }
  }

  // If the intent is not defined in the intent map, do not modify the contexts
  return contexts;
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


/**
 * Contrary to the function above, this function extends the given contexts'
 * lifespanCount by 1.
 * 
 * @param {Array} contexts Contexts parsed from the query result
 * @returns {Array} Output contexts with 0 lifespan count 
 */
function extendContext(contexts) {
  if (!contexts || contexts.length === 0) {
    return null;
  }

  let extendedContext = [];
  contexts.forEach(context => {
    extendedContext.push({
      name: context.name,
      lifespanCount: 1
    });
  });

  return extendedContext;
}