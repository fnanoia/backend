const supertest = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../index");

const request = supertest(app);

//GET all users
describe("Api tests", () => {
  after(async () => {
    console.log("cleaning db...");
    await request.delete("/user");
  });

  it("get all users", async () => {
    const response = await request.get("/user");
    expect(response.status).equal(200);
  });

  //CREATE new user
  it("save new user to db", async () => {
    const response = await request.post("/register").send({
      email: "test@test.com",
      password: "test123",
      name: "test",
      age: 23,
    });
    expect(response.status).equal(200);
  });

  //UPDATE user
  it("update user from db. the id is given by params", async () => {
    const response = await request.post("/register").send({
      email: "update_test@test.com",
      password: "test123",
      name: "test",
      age: 23,
    });

    expect(response.status).equal(200);
    const userId = response.body.data._id;

    const updateUser = await request.put(`/user/${userId}`).send({
      email: "update2_test@test.com",
    });
    expect(updateUser.body.message).equal("user updated successfully");
  });

  //DELETE user
  it("delete user from db. the id is given by params", async () => {
    const response = await request.post("/register").send({
      email: "delete_test@test.com",
      password: "test123",
      name: "test",
      age: 23,
    });

    expect(response.status).equal(200);
    const userId = response.body.data._id;

    const deleteUser = await request.delete(`/user/${userId}`);
    expect(deleteUser.body.message).equal("user deleted successfully");
  });
});
