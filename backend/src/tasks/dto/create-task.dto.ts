import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  description: string;

}
