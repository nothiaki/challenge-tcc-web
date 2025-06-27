import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all tasks`;
  }

  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}
