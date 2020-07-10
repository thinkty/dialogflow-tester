**DialogFlow Webhook Response API Summary**

This document has been made with reference to the [official guide](https://cloud.google.com/dialogflow/docs/fulfillment-webhook#webhook_response)

- res-17-16-08.json :
- res-17-30-23.json : Mulitple messages in the `text` results in a single message.

- res-17-36-08.json : The original `fulfillmentText` that was with the Intent gets ignored if the webhook sets a new value to it. However, since the `fulfillmentText` comes with the `request`, the webhook can just put it back.

- res-17-40-42.json : Even if there are mulitple `text`s in the `fulfillmentMessages`, only the last one gets sent.

- res-17-43-45.json : `outputContexts` gets sent directly to DialogFlow. However, it merges with the output contexts that were already defined in the Intent. Therefore, setting the output context beforehand makes it difficult for the webhook to control the flow.

- res-17-54-52.json : The webhook can set the `event` by specifying the `followupEventInput` field. When an event is specified, the response that the webhook sent as fulfillment will be ignored and will trigger the Intent by the given event. After the Intent has been triggered, DialogFlow will handle it as same as other intents.
More information can be found [here](https://cloud.google.com/dialogflow/docs/events-custom#webhook).

- res-18-00-23.json : If the webhook responds with an `event` that does not exist, DialogFlow will go to the nearest Fallback Intent.
