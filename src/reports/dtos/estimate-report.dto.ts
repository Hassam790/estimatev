import { Transform } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class GetEstimateDto {
@IsString()
  make: string;

  @IsString()
  modal: string;
  
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;
@Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  
}
