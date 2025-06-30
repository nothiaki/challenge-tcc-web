import {
  Controller,
  Get,
  Post,
  ParseUUIDPipe,
  Body,
  Param,
  Delete,
  HttpCode,
  Patch
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ResponseTaskDto } from './dto/response-task.dto';
import { Task } from './domain/task.domain';
import { UpdateDoneTaskDto } from './dto/update-done-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.tasksService.create(createTaskDto);
    return new ResponseTaskDto(task);
  }

  @Get()
  async findAll() {
    const tasks: Task[] = await this.tasksService.findAll();

    const filteredTasks: ResponseTaskDto[] =
      tasks.map(task => new ResponseTaskDto(task));

    return filteredTasks;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.remove(id);
  }

  @Patch(':id')
  async updateDoneTask(@Param('id', ParseUUIDPipe) id: string, @Body() updateDoneTaskDto: UpdateDoneTaskDto) {
    const task = await this.tasksService.updateDoneTask(id, updateDoneTaskDto);
    return new ResponseTaskDto(task);

  }
}
