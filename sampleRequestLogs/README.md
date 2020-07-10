**DialogFlow Webhook Request API Summary**

**Request from the outermost intent**

- intent-1.json : The intent only had `training phrases` filled in and has been triggered by the user's input: "하이". As a result, the intent has been triggered with 100$ confidence.

- intent-2.json : The intent also had a `fulfillment message` and it came with the request.
	
- intent-3.json : The `event` section of the intent doesn't come with the request.

- intent-4.json
- intent-5.json : Request of an intent with the `output context` specified. When `input context` is specified, no matter how similarly the user responds to the training phrase, the intent will not be triggered as the context does not match.

- intent-6.json : Request of an intent with the `action` field specified. According to the [Official Guide](https://cloud.google.com/dialogflow/docs/intents-actions-parameters#actions), it will be useful to put a hint for the webhook to decide the response. For example, the name of a function to decide the output context will be superb for controlling the flow.

- intent-7.json : Requets of an intent with `entities` specified. In the `parameters`, it was filled with date-time and weather and the values that represent those entities.


**Request from a fallback intent**

- intent-8.json : The outermost fallback intent catches all user inputs that other intents could not catch. Like any other intents, one can specify `event` and `action` to the fallback intent.


**Request from a followUp intent**

- intent-9.json : Request from an outermost intent that has two followup intents. In the `outputContexts`, an array of two followup intents is given.

- intent-10.json : Request from a followup intent. It doesn't seem so different from other type of intents. Since the `inputContext` does not come with the request, I don't think the webhook can know that it is a followup intent.

- intent-11.json : Request from a fallback intent inside the followup group. When the user input has to go to a fallback intent, it always goes to the closest fallback intent from the current context. However, if the fallback intent does not specify another output context, the context will eventually be reset and the user will have to enter the followup again from the top (beginning).

- intent-12.json : Request from a fallback intent inside the followup group where the context has been set weird. To control the flow with the webhook, the webhook must specify the output context in the response.

