import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty, IsString } from 'class-validator';
import { type RunAgentInput } from 'beeax-shared/application';

@InputType('RunAgentInput')
export class RunAgentInputDTO implements RunAgentInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  agentUniversalIdentifier: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  prompt: string;
}
