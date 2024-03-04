import express from "express";
import { create, fetch, update, deleteUser  } from "../controller/userController.js";


const route = express.Router();

route.get("/fetch", fetch)   // route to get all users from mongodb database
route.post("/create", create);  // route to create a new user
route.put("/update/:id", update)  // route to update a specific user by id
route.delete("/delete/:id", deleteUser); // route to delete a user from database

export default route;