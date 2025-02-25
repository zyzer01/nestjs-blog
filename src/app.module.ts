import { AuthenticationGuard } from './resources/auth/guards/authentication/authentication.guard';
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
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from './resources/auth/guards/access-token/access-token.guard';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';
import { FileUploadModule } from './resources/file-upload/file-upload.module';
import { MailModule } from './resources/mail/mail.module';
import { MailService } from './resources/mail/mail.service';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    TagModule,
    MetaOptionModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configService.get('database.host'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        port: configService.get('database.port'),
      }),
    }),
    PaginationModule,
    FileUploadModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    AccessTokenGuard,
    MailService,
  ],
})
export class AppModule {}
