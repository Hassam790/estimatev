import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/estimate-report.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report)  private readonly repo : Repository<Report> ) {}
    create(report: CreateReportDto, user: User) {
        const reportEntityInstance =  this.repo.create(report);
        reportEntityInstance.user = user;
        return this.repo.save(reportEntityInstance);
    }

   async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({
            where: { id: parseInt(id) },
            // relations: ['user'] // Load the user relationship
        });
        if(!report){
            throw new NotFoundException(`Report not found`)
        }
        report.approved = approved;
        return this.repo.save(report)
    }

    async createEstimate(query: GetEstimateDto) {
        return this.repo.createQueryBuilder()
            .select("AVG(price)", "price")
            .where("make = :make", {make: query.make})
            .andWhere("modal = :modal", {modal: query.modal})
            .andWhere("ABS(year - :year) <= 3", {year: query.year})
            .andWhere("approved = true")
            .getRawOne();
    }
}
