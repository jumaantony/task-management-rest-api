import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { TasksRepository } from './tasks.repository'
import { Task } from './task.entity'

@Injectable()
export class TasksService {
    // dependancy injection
    constructor(
        @InjectRepository(TasksRepository) 
        private tasksRepository: TasksRepository,
        ) {}

    // create a task
    createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(CreateTaskDto)
    }


    // get task by Id
    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOneBy({ id })

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }

        return found
    }

    // delete task
    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete({ id })

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }      
    }

    // update task status
    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        
        task.status = status;
        await this.tasksRepository.save(task);

        return task;
    }

    // Get tasks
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto)
    }

    /*
    //store tasks in memory
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto

        let tasks = this.getAllTasks()

        if (status) {   
            tasks = tasks.filter(task => task.status === status)
        }

        if (search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search)
            )
        }

        return tasks
    }

    // create a task
    // createTask(title: string, description: string): Task {
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }

    //     this.tasks.push(task)
    //     return task
    // }

    createTask(CreateTaskDto: CreateTaskDto): Task {
        const { title, description } = CreateTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }

    // fetching a single task by id
    getTaskById(id: string): Task {  
        // try to get task otherwise throw error 404 not found
        const found = this.tasks.find(task => task.id === id)

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }

        return found
    }

    // delete a task
    deleteTask(id: string): void {
        const found = this.getTaskById(id)
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    // update task status
    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
    */
    
}
