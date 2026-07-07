import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import config from 'config';
import { AllExceptionFilter } from './httpExceptioFilter';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.get('mongodbUrl'), {  // this establishes the database connection
      w: 1,
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_FILTER', 
    useClass: AllExceptionFilter
  }],
})
export class AppModule {}
