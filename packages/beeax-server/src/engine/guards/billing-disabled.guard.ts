import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { TwentyConfigService } from 'src/engine/core-modules/beeax-config/beeax-config.service';

@Injectable()
export class BillingDisabledGuard implements CanActivate {
  constructor(private readonly twentyConfigService: TwentyConfigService) {}

  canActivate(_context: ExecutionContext): boolean {
    return !this.twentyConfigService.isBillingEnabled();
  }
}
