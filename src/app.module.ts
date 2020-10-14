import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';

@Module({
 imports: [],
 controllers: [],
 providers: [AppGateway],
 // 클라이언트와 수신하기 위해 모듈에 추가
})
export class AppModule {}