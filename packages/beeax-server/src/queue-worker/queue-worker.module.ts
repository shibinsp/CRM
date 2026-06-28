import { Module } from '@nestjs/common';

import { CoreEngineModule } from 'src/engine/core-modules/core-engine.module';
import { JobsModule } from 'src/engine/core-modules/message-queue/jobs.module';
import { MessageQueueModule } from 'src/engine/core-modules/message-queue/message-queue.module';
import { GlobalWorkspaceDataSourceModule } from 'src/engine/beeax-orm/global-workspace-datasource/global-workspace-datasource.module';
import { TwentyORMModule } from 'src/engine/beeax-orm/beeax-orm.module';
import { WorkspaceEventEmitterModule } from 'src/engine/workspace-event-emitter/workspace-event-emitter.module';

@Module({
  imports: [
    CoreEngineModule,
    MessageQueueModule.registerExplorer(),
    WorkspaceEventEmitterModule,
    JobsModule,
    TwentyORMModule,
    GlobalWorkspaceDataSourceModule,
  ],
})
export class QueueWorkerModule {}
