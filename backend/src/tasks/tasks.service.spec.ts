import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateDoneTaskDto } from './dto/update-done-tasks.dto';

const mockPrismaService = {
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  }
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService
        }
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a task with success', async () => {
      const createTaskDto: CreateTaskDto = { description: 'new task' };
      const createdTask = {
        id: 'd4ec1109-b6c0-416c-a561-57b24d80f4ba',
        description: 'new task',
        isActive: true,
        done: false,
        createdAt: new Date()
      };

      mockPrismaService.task.create.mockResolvedValue(createdTask);

      const result = await tasksService.create(createTaskDto);

      expect(mockPrismaService.task.create).toHaveBeenCalledWith({
        data: {
          description: createTaskDto.description,
        },
      });

      expect(result).toEqual(createdTask);
    });
  });

  describe('find tasks', () => {
    it('should find all tasks with succes', async () => {
      const activeTasks = [
        {
          id: '9c281978-fcef-49ef-8fb1-118fef2861de',
          description: 'task 1',
          isActive: true,
          done: false,
          createdAt: new Date()
        },
        {
          id: '03f491bb-11ce-4c77-8fcc-e00091760d35',
          description: 'task 2',
          isActive: true,
          done: false,
          createdAt: new Date()
        }
      ];

      mockPrismaService.task.findMany.mockResolvedValue(activeTasks);

      const result = await tasksService.findAll();

      expect(mockPrismaService.task.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
        },
      });

      expect(result).toEqual(activeTasks);

    });
  });

  describe('remove', () => {
    it('should set isActive to false for a given task', async () => {
      const id = '23438dcd-daaf-4dd0-8171-bd447f52b233';
      const updatedTask = {
        id: id,
        description: 'task to remove',
        isActive: false,
        done: false,
        createdAt: new Date()
      };

      mockPrismaService.task.update.mockResolvedValue(updatedTask);

      const result = await tasksService.remove(id);

      expect(mockPrismaService.task.update).toHaveBeenCalledWith({
        where: { id: id },
        data: { isActive: false },
      });

      expect(result).toEqual(updatedTask);
    });
  });

  describe('update done task', () => {
    it('should update the done status of a task', async () => {
      const id = 'aaa5dec4-5d2a-4888-8125-95cd04cfadc5';
      const updateDoneTaskDto: UpdateDoneTaskDto = {
        done: true
      };
      const updatedTask = {
        id: id,
        description: 'task to update',
        isActive: true,
        done: true,
        createdAt: new Date()
      };

      mockPrismaService.task.update.mockResolvedValue(updatedTask);

      const result = await tasksService.updateDoneTask(id, updateDoneTaskDto);

      expect(mockPrismaService.task.update).toHaveBeenCalledWith({
        where: {
          id: id
        },
        data: {
          done: updateDoneTaskDto.done
        },
      });

      expect(result).toEqual(updatedTask);
    });
  });

});
