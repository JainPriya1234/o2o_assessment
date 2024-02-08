# E-Commerce Platform with Inventory Management

This project is an e-commerce platform with inventory management capabilities. It provides GraphQL APIs for both buyers and sellers to interact with the system. The platform allows buyers to view products, place orders, and manage their shopping carts. Sellers can manage inventory by adding, updating, or removing products and variants.

## Features

- View products with details and variants
- Place orders for products with different variants
- Manage inventory for sellers (CRUD operations)
- Secure GraphQL APIs with authentication and authorization
- Performant GraphQL queries for fetching products and variants

## Technologies Used

- Database: MongoDB
- Backend: Node.js with Express (or Hasura)
- GraphQL: Apollo Server (or Hasura)
- Frontend: [Your frontend technology here]
- Authentication: [Your authentication method here]
- Deployment: [Your deployment platform here]

## Setup Instructions

1. **Clone the repository:**
- git clone https://github.com/JainPriya1234/o2o_assessment.git

2. **Install dependencies:**
- npm install

3. **Set up MongoDB:**
- Update the MongoDB connection URI in the `.env` file.

4. **Start the server:**
- npm start

5. **Access the GraphQL Playground:**

Open your web browser and go to `http://localhost:8000/graphql` to access the GraphQL Playground.

6. **Explore the API:**

Use the provided GraphQL queries and mutations to interact with the API.

## API Documentation

The GraphQL API provides the following operations:

- Query: Fetch products and variants
- Mutation: Place order, Update inventory

For detailed documentation, refer to the GraphQL schema or API documentation.





