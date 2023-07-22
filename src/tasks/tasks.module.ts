import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // this will load all entities in the entities folder
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {
  
}
