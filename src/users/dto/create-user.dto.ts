import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { userTypes } from 'src/shared/schema/users';


/*
This create user DTO makes use of class validators to give us an pattern to how a user can be create in the user module, it makes use of 
class validator decorators like @IsNotEmpty, @IsString, @IsIn to make sure data coming from the clients side are strictly alligned with
expectations.
*/

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsIn([userTypes.ADMIN, userTypes.CUSTOMER])
    type: string;

    @IsString()
    @IsOptional()
    secretToken?: string;

    isVerified?: boolean; 
}
