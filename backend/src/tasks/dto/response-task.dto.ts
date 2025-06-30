import { Task } from "../domain/task.domain";

export class ResponseTaskDto {

  id: string;

  description: string;

  done: boolean;

  createdAt: Date

  constructor(task: Partial<Task>) {
    this.id = task.id;
    this.description = task.description;
    this.done = task.done;
    this.createdAt = task.createdAt;
  }

}
