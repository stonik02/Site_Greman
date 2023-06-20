import { Controller } from '@nestjs/common';
import { OrderedItemService } from './ordered_item.service';

@Controller('ordered-item')
export class OrderedItemController {
    constructor(private readonly oderedItemService: OrderedItemService) {}
}
