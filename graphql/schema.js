import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type Query {
        readProduct(id: Int!): Product
    }
    type Mutation {
        createProduct(input: ProductCreateInput!): Product
    }
    input ProductCreateInput {
        name: String!
        price: Float!
    }
    type Product {
        id: Int!
        name: String!
        price: Float!
    }
`;
