import { Module } from '@nestjs/common';

import { TwentyORMModule } from 'src/engine/beeax-orm/beeax-orm.module';

import { RecordPositionService } from './services/record-position.service';

@Module({
  imports: [TwentyORMModule],
  providers: [RecordPositionService],
  exports: [RecordPositionService],
})
export class RecordPositionModule {}
