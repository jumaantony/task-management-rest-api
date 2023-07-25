import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from "./task.entity";
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksRepository extends Repository<Task>{
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
      }

    async createTask({ title, description }: CreateTaskDto, user: User): Promise<Task> {
      const task = this.create({
        title,
        description,
        status: TaskStatus.OPEN,
        user,
      });
  
      await this.save(task);
      return task;
    }


   async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const {status, search} = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({user})

    if(status){
        query.andWhere('task.status = :status', { status })
    }

    if(search){
        query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })   
    }

    const tasks = await query.getMany();
    return tasks;
   }

}