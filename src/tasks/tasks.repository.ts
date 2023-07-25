import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from "./task.entity";
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class TasksRepository extends Repository<Task>{
    private logger = new Logger('TasksRepository', { timestamp: true })  

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

    try{
        const tasks = await query.getMany();
        return tasks;
    } catch (error) {
        this.logger.error(`Failed to get tasks for user "${user.username}", Filters: 
        ${JSON.stringify(filterDto)}`, error.stack);
        
        throw new InternalServerErrorException();
    }
   }

}