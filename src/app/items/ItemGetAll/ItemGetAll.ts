import { Item, ItemRepository } from "src/domain/item";

export class ItemGetAll{
    constructor(private repository:ItemRepository) {
        
    }
    async run():Promise<Item[]>{
        return await this.repository.getAll()
    }
}