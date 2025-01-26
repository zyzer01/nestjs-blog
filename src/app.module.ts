import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resources/user/user.module';
import { PostModule } from './resources/post/post.module';
import { AuthModule } from './resources/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from './resources/tag/tag.module';
import { MetaOptionModule } from './resources/meta-option/meta-option.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    TagModule,
    MetaOptionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configService.get('DATABASE_HOST'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        port: configService.get('DATABASE_PORT'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
