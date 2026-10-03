// getUsers
// getSingleUser
// createUser
// deleteUser
// updateUser

const User = require("../models/User")

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: "Users",
            users
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ _id: userId })
        if(!user){
            return res.status(404).json({
                message: "User Not Found"
            })
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const createUser = async (req, res) => {
    try {
        const {name, userEmail, password, experience} = req.body;
        const existingUser = await User.findOne({email: userEmail});
        if(existingUser){
            return res.status(400).json({
                message: "User already exists!"
            })
        }
        const newUser = await User.create({
            name,
            email: userEmail,
            password,
            experience
        })
        res.status(201).json({
            message: "User created successfully!",
            newUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findOne({_id: userId});
        if(!user){
            return res.status(404).json({
                message: "User not found."
            })
        }
        const allowedFields = [
            "name",
            "email",
            "experience"
        ]
        const updates = Object.fromEntries(
            Object.entries(req.body).filter(
                ([key]) => allowedFields.includes(key)
            )
        )
        Object.assign(user, updates)
        await user.save();
        res.status(200).json({
            message: "User updated successfully!",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            return res.status(404).json({
                message: "No User Found"
            })
        }
        res.status(200).json({
            message: "User deleted successfully",
            deletedUser
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getUsers, getUserById, createUser,
    updateUser, deleteUser
}