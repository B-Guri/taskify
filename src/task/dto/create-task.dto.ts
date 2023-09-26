import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  @IsOptional()
  start_date: number | null;

  @IsNumber()
  @IsOptional()
  due_date: number | null;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  estimate: number | null;
}
