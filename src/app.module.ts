import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.sngygzwqmaqmnmcjvgys.supabase.co',
      port: 5432,
      username: 'postgres',
      password: 'Accessdenied@2023',
      database: 'postgres',
      autoLoadEntities: true, // this will load all entities in the entities folder
      synchronize: true, // this will automatically create tables in the database
      
    })],
  controllers: [],
  providers: [],
})
export class AppModule { }
