import { ItemId, ItemRepository } from "src/domain/item";

export class ItemDelete{
    constructor(private repository: ItemRepository) {
        
    }

    async run(id:number):Promise<void>{
        await this.repository.delete(new ItemId(id))
    }
}