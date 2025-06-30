import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDoneTaskDto } from './dto/update-done-tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.prismaService.task.create({
      data: {
        description: createTaskDto.description,
      }
    });
  }

  async findAll() {
    return await this.prismaService.task.findMany({
      where: {
        isActive: true
      }
    });
  }

  async remove(id: string) {
    try {
      return await this.prismaService.task.update({
        where: {
          id: id
        },
        data: {
          isActive: false
        }
      });
    } catch (err) {
      throw new NotFoundException("Task not found");
    }
  }

  async updateDoneTask(id: string, updateDoneTaskDto: UpdateDoneTaskDto) {
    try {
      return await this.prismaService.task.update({
        where: {
          id: id
        },
        data: {
          done: updateDoneTaskDto.done
        }
      });
    } catch (err) {
      throw new NotFoundException("Task not found");
    }
  }
}
