import { PrismaClient } from "@prisma/client";

export class ProductService {
    #db = new PrismaClient();
    constructor() {
    }
    async read(id) {
        return this.#db.product.findUnique({ where: { id } });
    }
    async create(data) {
        return this.#db.product.create({ data })
    }
}