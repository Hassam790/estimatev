import { Expose, Transform } from "class-transformer";


export class Report {
    @Expose()
    id: number;
    @Expose()
    make: string;
    @Expose()
    modal: string;
    @Expose()
    year: number;
    @Expose()
    mileage: number;
    @Expose()
    price: number;
    @Expose()
    approved: boolean;
    @Expose()
    @Transform(({obj}) => obj.user?.id)
    userId: string;
}