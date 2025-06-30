import { IsBoolean } from 'class-validator';

export class UpdateDoneTaskDto {

  @IsBoolean()
  done: boolean;

}
