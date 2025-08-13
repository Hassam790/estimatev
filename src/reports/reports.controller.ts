import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Report } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/estimate-report.dto';


@Controller('reports')
@Serialize(Report)
export class ReportsController {
    constructor(private readonly reportsService : ReportsService) {}
    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        
        return this.reportsService.create(body, user);
    }

    @Get('/estimate')
    estimateReport(@Query() query: GetEstimateDto) {
        return this.reportsService.createEstimate(query);
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    ApproveReport(@Param('id') id: string, @Body() body: ApproveReportDto){
        
        return this.reportsService.changeApproval(id, body.approved)
    }
}
