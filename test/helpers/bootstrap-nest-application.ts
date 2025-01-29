import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { appCreate } from 'src/app.create';
import { AppModule } from 'src/app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

export async function bootstrapNestApplication(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, ConfigModule],
    providers: [ConfigService],
  }).compile();

  // Instatiate the app
  const app: INestApplication = moduleFixture.createNestApplication();
  await appCreate(app);
  await app.init();
  return app;
}
