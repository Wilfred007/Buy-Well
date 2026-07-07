import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";


export interface Response<T>{
    message: string;
    success: boolean;
    result: any;
    error: null;
    timeStamp: Date;
    statusCode: number;
}


export class TransformationInterceptor<T> 
implements NestInterceptor<T, Response<T>> 
{
    intercept(
        context: ExecutionContext, 
        next: CallHandler
    ): Observable<Response<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    const path = context.switchToHttp().getRequest().url;
    return next.handle().pipe(
        map((data) => ({
            message: data.message,
            success: data.success,
            result: data.result,
            timeStamp: new Date(),
            statusCode,
            path,
            error: null,
            
        }))
    )

    
    }
}



/*
Add the response interceptor to the main.ts

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformationInterceptor()).  => Here
  await app.listen(config.get('port'), () => {
    console.log(`Server is running on port ${config.get('port')} `)
  });
}



*/