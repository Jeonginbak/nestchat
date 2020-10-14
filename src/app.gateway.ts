import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Logger } from '@nestjs/common';
 import { Socket, Server } from 'socket.io';
 
 @WebSocketGateway()
 // socket.io 기능에 대한 엑세스를 제공하는 데코레이터
 export class AppGateway 
 implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 // 애플리케이션의 몇 가지 주요 상태를 기록하는 인터페이스
 // 새 클라이언트가 연결되거나 현재 클라이언트의 연결이 끊어 질 때

  @WebSocketServer() server: Server;
  //서버 인스턴스 액세스
  private logger: Logger = new Logger('AppGateway');
 
  @SubscribeMessage('msgToServer')
  // handleMessage()가 'msgToServer'라는 이벤트를 수신할 수 있게 하는 데코레이터
  handleMessage(client: Socket, payload: string): void {
   this.server.emit('msgToClient', payload);
  }
  // handleMessage() - emit() 서버에 연결된 모든 클라이언트에 데이터를 보내는 함수
 
  afterInit(server: Server) {
   this.logger.log('Init');
  }
 
  handleDisconnect(client: Socket) {
   this.logger.log(`Client disconnected: ${client.id}`);
  }
 
  handleConnection(client: Socket, ...args: any[]) {
   this.logger.log(`Client connected: ${client.id}`);
  }
 }