# DialogFlow Tester (Mock Fulfillment Webhook)

![wehbooks in DialogFlow](https://imgur.com/ptthjWz.png)
Image from [DialogFlow](https://cloud.google.com/dialogflow/docs/fulfillment-overview)

This is a simple Node+Express Webhook to test DialogFlow V2 APIs and mock a fulfillment webhook locally while meeting the [requirements](https://cloud.google.com/dialogflow/docs/fulfillment-webhook#requirements).
It uses an npm version of [ngrok](https://ngrok.com/) to get a secure public url which is a core requirement for registering a webhook to DialogFlow.
Depending on how the program is started, the requests or responses will be stored locally in a json file.

## Install
1. Clone the repository and install the npm dependencies

```
git clone https://github.com/thinkty/DialogFlow-Tester.git
```

```
npm install
```
2. After downloading the dependencies, start the application with either `npm run request` to test requests from DialogFlow or `npm run response` to test sending responses from this application to DialogFlow.

3. After successfully launching the application, in the terminal, there should be a secured (https) public url from `ngrok`.

4. Copy the url and paste it in to the DialogFlow console. Go to `DialogFlow console > Fulfillment > Webhook` and paste the ngrok url in the url input field and click save.
![dialogflow console for webhook](https://imgur.com/hFvSWK0.png)

5. Click on `Save` and type into the `Try it now` input field to test your webhook. Make sure to enable webhook in the [Fulfillment](https://cloud.google.com/dialogflow/docs/fulfillment-overview) section of the intent.

## Customization
You can also modify the [`generateResponse`](https://github.com/thinkty/DialogFlow-Tester/blob/master/src/responseHandler.js) function to add your own payloads to the response back to DialogFlow.

### License
MIT
