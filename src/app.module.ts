import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import LogsMiddleware from './logs/logs.middleware';
import { LogsModule } from './logs/logs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import entitys from './entitys';
import { AuthMiddleware } from './auth/auth.middleware';
import { MachinesModule } from './machines/machines.module';
import { DefectsModule } from './defects/defects.module';
import { DepartamentsModule } from './departaments/departaments.module';
import { CookiesModule } from './cookies/cookies.module';
import { CryptoModule } from './crypto/crypto.module';
import { JwtModule } from './jwt/jwt.module';
import { ConsumablesModule } from './consumables/consumables.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [...entitys],
      }),
      inject: [ConfigService],
    }),
    LogsModule,
    AuthModule,
    UsersModule,
    MachinesModule,
    DefectsModule,
    DepartamentsModule,
    CookiesModule,
    CryptoModule,
    JwtModule,
    ConsumablesModule,
  ],
  providers: [AuthMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware, AuthMiddleware).forRoutes('*');
  }
}
