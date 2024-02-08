const express = require('express');
const mongoose = require('mongoose');
const {ApolloServer}= require('@apollo/server');
const { expressMiddleware }= require('@apollo/server/express4');
const bodyParser =require('body-parser');
const cors = require('cors');
const {default : axios} = require('axios');
const dotenv = require('dotenv');
dotenv.config();
//connection 
const connectDB = mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(console.log("DB Connected Succesfully...."))
.catch((err)=>{
    console.log(err,"DB Connection Failed!")
    process.exit(1)
});

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    variants: [{
      variantName: String,
      price: Number,
      inventoryCount: Number
    }]
  });
  
  const OrderSchema = new mongoose.Schema({
    buyerId: Number,
    totalAmount: Number,
    createdAt: Date,
    items: [{
      variantId: mongoose.Schema.Types.ObjectId,
      quantity: Number
    }]
  });
  
  const ProductModel = mongoose.model('Product', ProductSchema);
  const OrderModel = mongoose.model('Order', OrderSchema);
  

async function startServer(){
    const app = express();
    const server = new ApolloServer({
        typeDefs: `

        type Product {
            id: ID!
            name: String!
            description: String
            variants: [Variant]
          }
        
          type Variant {
            id: ID!
            variantName: String!
            price: Float!
            inventoryCount: Int!
          }
        
          type Order {
            id: ID!
            buyerId: Int!
            totalAmount: Float!
            createdAt: String!
            items: [OrderItem]
          }
        
          type OrderItem {
            id: ID!
            variantId: ID!
            quantity: Int!
          }
        
          input OrderItemInput {
            variantId: ID!
            quantity: Int!
          }
        
          type Query {
            products: [Product]
            orders: [Order]
          }
        
          type Mutation {
            createOrder(buyerId: Int!, items: [OrderItemInput!]!): Order
          }
        `,
        resolvers: {
            Query: {
                products: async () => {
                  return await ProductModel.find();
                },
                orders: async () => {
                  return await OrderModel.find();
                }
              },
              Mutation: {
                createOrder: async (_, { buyerId, items }) => {
                  // Calculate total amount
                  const totalAmount = items.reduce((acc, curr) => {
                    return acc + (curr.quantity * curr.price);
                  }, 0);
            
                  // Create order
                  const order = new OrderModel({
                    buyerId: buyerId,
                    totalAmount: totalAmount,
                    createdAt: new Date(),
                    items: items
                  });
            
                  // Save order
                  await order.save();
                  
                  // Update inventory counts for variants (not implemented in this example)
            
                  return order;
                }
              }
            
        }
    });
    
    app.use(bodyParser.json());
    app.use(cors());

    await  server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000,()=> console.log("server started at PORT 8000"));
}

startServer();
