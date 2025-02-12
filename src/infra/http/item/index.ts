import { PrismaItemRepository } from "@/infra/database/prisma";
import { CreateItemUseCase, GetItemUseCase, ListItemUseCase } from "@/modules/item/use-cases/";

import { CreateItemController } from "./create.controller";
import { GetItemController } from "./get.controller";
import { ListItemController } from "./list.controller";

const itemRepository = new PrismaItemRepository();
const createItemUseCase = new CreateItemUseCase(itemRepository);
export const createItemController = new CreateItemController(createItemUseCase);

const getItemUseCase = new GetItemUseCase(itemRepository);
export const getItemController = new GetItemController(getItemUseCase);

const listItemUseCase = new ListItemUseCase(itemRepository);
export const listItemController = new ListItemController(listItemUseCase);
