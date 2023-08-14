import { Controller } from '@nestjs/common';
import { CouplesService } from './couples.service';

@Controller('couples')
export class CouplesController {
  constructor(private readonly couplesService: CouplesService) {}
}
