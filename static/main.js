const app = new Vue({
    el: '#app',
    data: {
     title: 'Nestjs Websockets Chat',
     name: '',
     text: '',
     messages: [],
     socket: null
    },
    methods: {
    // 레이아웃에서 입력을 가져와 입력이 올바르면 동일한 이벤트를 사용하여
    // 서버로 보내는 함수
     sendMessage() {
      if(this.validateInput()) {
       const message = {
       name: this.name,
       text: this.text
      }
      this.socket.emit('msgToServer', message)
      this.text = ''
     }
    },
    receivedMessage(message) {
     this.messages.push(message)
    },
    validateInput() {
     return this.name.length > 0 && this.text.length > 0
    }
   },
   // 프론트 엔드가 생성 될 때마다 실행되는 함수
   // socket.io 라이브러리를 가져와서 socket변수를 인스턴스화
   // server에서 생성한 'msgToClient'이벤트를 수신하는 이벤트 리스터를 socket에 추가
    created() {
     this.socket = io('http://localhost:3000')
     this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message)
     })
    }
   })