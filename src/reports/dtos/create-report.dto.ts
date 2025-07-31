import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReportDto {
@IsString()
  make: string;

  @IsString()
  modal: string;

  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}
