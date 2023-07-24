import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host,
      port: 5432,
      username: 'postgres',
      password: process.env.password,
      database: 'postgres',
      autoLoadEntities: true, // this will load all entities in the entities folder
      synchronize: true, // this will automatically create tables in the database
      
    }),
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
