import { Global, Module } from '@nestjs/common';

import { RedisClientService } from 'src/engine/core-modules/redis-client/redis-client.service';
import { TwentyConfigModule } from 'src/engine/core-modules/beeax-config/beeax-config.module';

@Global()
@Module({
  imports: [TwentyConfigModule],
  providers: [RedisClientService],
  exports: [RedisClientService],
})
export class RedisClientModule {}
