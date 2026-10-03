const express = require("express");
const {getUsers, getUserById, deleteUser, createUser, updateUser}  = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser)
router.patch("/:userId", updateUser)
router.delete("/:userId", deleteUser)

module.exports = router