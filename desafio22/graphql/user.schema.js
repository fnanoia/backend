const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const { userApi } = require("../dao/user.dao");

const userSchema = buildSchema(`

    type User {
        _id: ID,
        email: String,
        password: String,
        name: String,
        age: Int
    }
    
    input UserInput {
        email: String,
        password: String,
        name: String,
        age: Int
    }   
    
    type Query {
        getUsers: [User]
        getUserById(_id: ID): User
        
    }  
    
    type Mutation {
        registerUser(data: UserInput): User
        deleteUserById(_id: ID): User
        updateUserById(_id: ID, data: UserInput): User
    }
    
`);

const userResolvers = {
  getUsers: async () => {
    return await userApi.findAll();
  },
  getUserById: async (id) => {
    return await userApi.findOneById(id);
  },
  updateUserById: async ({ _id, data }) => {
    return await userApi.updateUser(_id, data);
  },
  deleteUserById: async (id) => {
    return await userApi.deleteUser(id);
  },
  registerUser: async ({ data }) => {
    return await userApi.createUser(data);
  },
};

const userGraphqlMiddleware = () => {
  return graphqlHTTP({
    graphiql: true,
    schema: userSchema,
    rootValue: userResolvers,
  });
};

module.exports = { userGraphqlMiddleware };
