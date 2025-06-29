import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prismaService.task.create({
      data: {
        description: createTaskDto.description,
      }
    });
  }

  findAll() {
    return this.prismaService.task.findMany({
      where: {
        isActive: true
      }
    });
  }

  remove(id: string) {
    return this.prismaService.task.update({
      where: {
        id: id
      },
      data: {
        isActive: false
      }
    });
  }
}
