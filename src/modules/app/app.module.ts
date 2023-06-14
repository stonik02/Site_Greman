import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize'
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from '../users/models/users.model';
import { UserModule } from '../users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load: []
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: "postgres",
      host: configService.get('db_host'),
      port: configService.get('db_port'),
      username: configService.get('db_user'),
      password: "qwerty123",
      database: configService.get('db_name'),
      synchronize: true,
      autoLoadModels: true,
      models: [User]
    }),
  }),
   ProductsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
