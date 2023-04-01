import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phoneNumber: string;

  @Field()
  address: string;
}

@ObjectType()
export class LoginResult {
  @Field(() => UserType)
  user: UserType;

  @Field(() => String)
  token: string;
}

@ObjectType()
class ErrorsType {
  @Field({ nullable: true })
  path?: string;

  @Field({ nullable: true })
  messages: string;
}

@ObjectType()
export default class UserResponse {
  @Field(() => [ErrorsType], { nullable: true })
  errors?: ErrorsType[];

  @Field(() => UserType, { nullable: true })
  user?: UserType;
}
