import { ProductService } from "../services/product.service.js";
const prodService = new ProductService();
export const resolvers = {
    Query: {
        readProduct: async (_, args, __) => prodService.read(args.id),
    },
    Mutation: {
        createProduct: async (_, args, __) => prodService.create(args.input)
    }
}