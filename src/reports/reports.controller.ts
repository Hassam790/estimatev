import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Report } from './dtos/report.dto';


@Controller('reports')
@Serialize(Report)
export class ReportsController {
    constructor(private reportsService : ReportsService) {}
    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        console.log('Creating report for user:', user);
        return this.reportsService.create(body, user);
    }
}
