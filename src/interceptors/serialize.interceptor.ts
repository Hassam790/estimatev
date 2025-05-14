import { CallHandler, ClassSerializerInterceptor, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable,map } from "rxjs";
// Custom DTO
export function Serialize(dto:any) {
    return UseInterceptors(new SerializeInterceptor(dto))
}
// Custom Interceptor
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any){}
    // Run something before request handler
    intercept(context:ExecutionContext,next:CallHandler): Observable<any>{
        return next.handle().pipe(
            map((data) => {
                // Run something before response is sent out
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues:true
                })
            })
        )
    }
}