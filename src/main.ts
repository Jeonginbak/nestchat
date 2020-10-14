import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
 const app = await NestFactory.create<NestExpressApplication>(AppModule);
 app.useStaticAssets(join(__dirname, '..', 'static'));
 // <NestExpressApplication> - static폴더를 사용하기 위해 Nest에 알리는 부분
 await app.listen(3000);
}
bootstrap();