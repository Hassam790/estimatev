import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { ReportsController } from './reports.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([Report]), // Import the Report entity
  ],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
