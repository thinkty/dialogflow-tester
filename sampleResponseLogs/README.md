**DialogFlow Webhook Response API 정리**

This document has been made with reference to the [official guide](https://cloud.google.com/dialogflow/docs/fulfillment-webhook#webhook_response)

- res-17-16-08.json :
- res-17-30-23.json : text 에 여러가지를 넣어도 한 문장으로 합쳐져서 보내진다.

- res-17-36-08.json : Intent 에서 원래 보내야할 fulfillmentText 는 만약 webhook 이 response 를 보내게 될 때 무시된다. 하지만 webhook 으로 오는 request 에 fulfillmentText 가 담겨오니, response 에 같이 넣으면 된다.

- res-17-40-42.json : fulfillmentMessages 에 여러 텍스트를 넣어도 마지막 텍스트만 보내진다.

- res-17-43-45.json : outputContexts 에 넣으면 그대로 전달된다. 그러나 문제는 기존 intent 에 정해져있던 output context 들과 합해진다. 그러므로 output context 를 미리 DialogFlow에 정해놓으면 안되고 무조건 webhook 에서만 정해야할 것 같다.

- res-17-54-52.json : followupEventInput 을 통해 event 를 정해줄 수 있다. Event 를 정해줘서 보내면 DialogFlow 는 방금 webhook 에서 보낸 response 를 무시하고 event 에 정해진 Intent 로 가서 진행을 한다.
자세한 정보는 [여기](https://cloud.google.com/dialogflow/docs/events-custom#webhook).

- res-18-00-23.json : 만약 존재하지 않는 event 를 주면 가장 가까운 fallback intent 로 가게 된다.