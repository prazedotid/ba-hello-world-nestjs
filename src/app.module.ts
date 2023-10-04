import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypedConfigModule } from 'nest-typed-config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RootConfig } from './config';
import { ConfigModule } from './config.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [TypedConfigModule],
      inject: [RootConfig],
      useFactory: async (config: RootConfig) => ({
        uri: config.mongo.uri,
      }),
    }),
    PostModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
