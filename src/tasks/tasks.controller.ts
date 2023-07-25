import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController')      
    constructor(private tasksService: TasksService) { }

    // retreive a single task
    @Get('/:id')
    async getTaskById(
        @Param('id') id: string, 
        @GetUser() user: User
        ): Promise<Task> {
        return this.tasksService.getTaskById(id, user)
    }

    // create a task
    @Post()
    createTask(
        @Body() CreateTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        this.logger.verbose(
            `User ${user.username} creating a new task. Data:
            ${JSON.stringify(CreateTaskDto)}`)
        return this.tasksService.createTask(CreateTaskDto, user)
    }

    // delete task
    @Delete('/:id')
    deleteTask(
        @Param('id') id: string,
        @GetUser() user: User,
        ): Promise<void> {
        return this.tasksService.deleteTask(id, user)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        // @Body('status') status: TaskStatus,
        @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
        @GetUser() user: User,
    ): Promise<Task> {
        const { status } = UpdateTaskStatusDto
        return this.tasksService.updateTaskStatus(id, status, user)
    }

    // get tasks
    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDto, 
        @GetUser() user: User,
        ): Promise<Task[]> {
        this.logger.verbose(
            `User ${user.username} retrieving all tasks. Filters: 
            ${JSON.stringify(filterDto)}`)
        return this.tasksService.getTasks(filterDto, user)
    }



    /*
    // retreiving all tasks from the service
    // @Get()
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks()
    // }

    // Get a particular task when a certain condition is met
    // Otherwise return all tasks
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto)
        } else {
            return this.tasksService.getAllTasks()
        }
    }


    // creating a task
    @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string   
    // ): Task {
    //     return this.tasksService.createTask(title, description)
    //     // console.log('title', title)
    // }
    createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(CreateTaskDto)
    }

    // fetching a single task by id
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id)
    }

    // delete task
    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id)
    }

    // update task status
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        // @Body('status') status: TaskStatus,
        @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
    ): Task {
        const { status } = UpdateTaskStatusDto
        return this.tasksService.updateTaskStatus(id, status)
    } 
    */

}
