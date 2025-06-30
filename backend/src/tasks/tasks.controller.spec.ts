import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateDoneTaskDto } from './dto/update-done-tasks.dto';
import { Task } from './domain/task.domain';

const mockTasksService = {
  create: jest.fn(),
  findAll: jest.fn(),
  remove: jest.fn(),
  updateDoneTask: jest.fn(),
};

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService
        }
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

 describe('create', () => {
    it('should create a task and return a ResponseTaskDto', async () => {
      const createTaskDto: CreateTaskDto = {
        description: 'new task'
      };
      const createdTask: Task = {
        id: '2e8d8cc5-3048-4cd3-b150-3971b26ea686',
        description: 'task',
        isActive: true,
        done: false,
        createdAt: new Date(),
      };

      mockTasksService.create.mockResolvedValue(createdTask);

      await tasksController.create(createTaskDto);

      expect(tasksService.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of ResponseTaskDto', async () => {
      const tasks: Task[] = [
        {
          id: 'a9b61795-74ff-45bf-af24-cc21044adb93',
          description: 'task 1',
          isActive: true,
          done: false,
          createdAt: new Date(),
        },
        {
          id: 'c56540d4-223c-4411-8f46-3a077f395ab3',
          description: 'task 2',
          isActive: true,
          done: true,
          createdAt: new Date(),
        },
      ];

      mockTasksService.findAll.mockResolvedValue(tasks);

      await tasksController.findAll();

      expect(tasksService.findAll).toHaveBeenCalled();
    });

  });

  describe('remove', () => {
    it('should call remove with the given id', async () => {
      const id = 'b2dac6d9-b3cf-49e0-a8c7-5c53e87b24d9';
      const removedTask: Task = {
        id: id,
        description: 'task',
        isActive: false,
        done: false,
        createdAt: new Date(),
      };

      mockTasksService.remove.mockResolvedValue(removedTask);

      await tasksController.remove(id);

      expect(tasksService.remove).toHaveBeenCalledWith(id);
    });

  });

  describe('updateDoneTask', () => {
    it('should update the done status of a task and return a ResponseTaskDto', async () => {
      const id = '2f8958ba-9a2b-45da-9d8a-6ade94ec32a0';
      const updateDoneTaskDto: UpdateDoneTaskDto = { done: true };
      const updatedTask: Task = {
        id: id,
        description: 'task',
        isActive: true,
        done: true,
        createdAt: new Date(),
      };

      mockTasksService.updateDoneTask.mockResolvedValue(updatedTask);

      await tasksController.updateDoneTask(id, updateDoneTaskDto);

      expect(tasksService.updateDoneTask).toHaveBeenCalledWith(id, updateDoneTaskDto);
    });
  });

});
