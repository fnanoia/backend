const UserModel = require("../db/models")

//find all users
const findAll = async (req, res) => {
    const users = await UserModel.find()

    return users
}
//find one user by id
const findOneById = async (req, res, id) => {
    const user = await UserModel.findOne(id)
   
    return user
}

//find one user by email
const findOneByEmail = async (req, res, email) => {
    const user = await UserModel.findOne({ email: email })

    return user
}

//create new user
const createUser = async (req, res, object) => {
    const user = await UserModel.create(object);

    return user
}

module.exports = { findAll, findOneById,  findOneByEmail, createUser }