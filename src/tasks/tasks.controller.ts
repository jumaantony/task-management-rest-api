import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

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

}
