import { Module } from '@nestjs/common';

import { TwentyConfigModule } from 'src/engine/core-modules/beeax-config/beeax-config.module';

import { ClickHouseService } from './clickHouse.service';

@Module({
  imports: [TwentyConfigModule],
  providers: [ClickHouseService],
  exports: [ClickHouseService],
})
export class ClickHouseModule {}
