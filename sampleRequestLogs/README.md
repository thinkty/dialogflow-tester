**DialogFlow Webhook Request API 정리**

아래의 리스트의 key 는 파일 이름이고, 
DialogFlow 에서 우리의 Webhook 으로 보낸 request 가 담겨있다.


**TopIntent 에서 오는 request**

- intent-1.json : 오직 training phrases 만 준비되어 있는 intent. 사용자의 발화로 인해 intent가 트리거 되어 들어온 intent. 볼 수 있듯이 사용자가 "하이" 라고 말을 건냈고, 이 intent에 100% confidence 로 걸려서 온 메시지이다.
- intent-2.json : fulfillment message 가 지정된 intent 에서는 저장된 fulfillment message 까지 같이 온다. fulfillmentText 와 fulfillmentMessages 에 이미 채워져서 온다.
	
- intent-3.json : event 를 정해준 intent 에서는 event 에 대한 정보는 오지 않는다.

- intent-4.json &&
- intent-5.json : output context 를 정해준 intent 의 request. 앞서 input context 도 같이 설정을 해주었더니, 아무리 training phrases 에 있는 문장과 똑같이 써도 context 가 일치하지 않으므로 webhook 으로 fulfillment 가 오지 않았다. 

- intent-6.json : Action 을 정해준 intent 의 request. [공식적인 자료](https://cloud.google.com/dialogflow/docs/intents-actions-parameters#actions)에서도 볼 수 있듯이, 이 곳에는 webhook 에서 판단을 할 때 사용할 함수의 이름 또는 도움이 될만한 것을 넣어주면 좋을 것 같다. 

- intent-7.json : Entity 들 (날씨, 시간) 을 정해준 intent 의 request. parameters 에 key 로 date-time 과 weather (Dialog Flow 에 정한 entity 이름) 이 오고 그것을 대표하는 값들이 value 로 왔다.


**Fallback Intent 에서 오는 request**

- intent-8.json : 가장 바깥 쪽, 즉 아무런 intent 속에 있지 않은, Fallback Intent 로서 다른 어떠한 intent 들이 사용자의 발화를 알아듣지 못하면 이쪽으로 빠지게 되는 intent 이다. 이 fallback intent 에도 Event 를 추가할 수 있어서 TimeUp 이라는 event 를 추가하여 만약 사용자가 장시간 무응답일 경우 바로 이 intent 로 빠지게 하고 output context 를 webhook response 에 포함하여 무응답 시 어떤 노드로 빠져야 하는지 알려줄 수도 있다. Event 에 더불어 Training Phrases 도 정의해줄 수 있다. 이는 욕설 또는 비속어를 걸러내기에 쓰일 수 있을 것 같다. 훈련문장들에 이어 Action 도 붙여줄 수 있다. 평범한 Intent 와 비슷하게 액션은 webhook 쪽에서 판단할 때 도움을 주기 위해 있는 것이다. Action 에 Mumbling 이라고 하여 사용자의 발화를 잘 이해하지 못하였을 때 사용할 수 있다.


**FollowUp 속에 있는 Intent**

- intent-9.json : 속에 두 followup intent 가 있는 top intent. outputContexts 로 온 배열에 두 followup intent 가 있다.

- intent-10.json : followup intent 이다. 딱히 다른 intent 와 차별되는 점은 없다. inputContext 가 무엇이었는지 오지 않으므로 그 값은 flowdata 를 봐야알 수 있을 것 같다.

- intent-11.json : followup intent 그룹 속에 있는 fallback intent 이다. 만약 사용자의 context 가 follow up 쪽에 있는 경우, 가장 바깥 쪽의 fallback 으로 떨어지기 보다 가장 가까운 fallback 으로 떨어진다. 하지만 이 fallback 으로 떨어지고 난 뒤, 별도로 output context 를 정해주지 않으면, context 가 바깥 쪽으로 한 단계 떨어지므로 다시 followup intent 를 들어오려면 전 과정을 통해 들어와야한다. 

- intent-12.json : followup 속 fallback 으로 떨어진 뒤, context 가 바뀌어 엉뚱한 곳으로 가버렸다. 이러한 경우를 막기위해 response 에 필수로 output context 를 넣어줘야 한다. 

