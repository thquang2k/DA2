const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const getAllUser = async (req, res, next) => {
    try {
        let users = await User.find();
        res.status(200).json({
            users: users,
            message: "Get all users succeeded!"
        })
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}
const getUserById = async (req, res, next) => {
    try {
        let userId = req.params.id
        if(!userId){
            res.status(400).json({
                users: users,
                message: "User ID is required"
            })
        }else{
            let user = await User.findOne({user_id: userId});
            res.status(200).json({
                user: user,
                message: `Get user by ID ${userId}`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const createUser = async (req, res, next) => {
    try {
        let username = req.body.username
        if(!username){
            res.status(400).json({
                message: "Username is required"
            })
        }
        let fullname = req.body.fullname
        if(!fullname){
            res.status(400).json({
                message: "Fullname is required"
            })
        }
        let phoneNumber = req.body.phoneNumber
        if(!phoneNumber){
            res.status(400).json({
                message: "Phone number is required"
            })
        }
        let email = req.body.email
        if(!email){
            res.status(400).json({
                message: "Email is required"
            })
        }
        let password = req.body.password
        if(!password){
            res.status(400).json({
                message: "password is required"
            })
        }
        let roleId = req.body.roleId
        if(!roleId){
            res.status(400).json({
                message: "Role is required"
            })
        }
        let userCount = User.countDocuments();
        let userId = userCount + 1
        let hashedPassword = bcrypt.hashSync(password, 10)
        let user = new User({
            user_id: userId.toString(),
            user_name: username,
            phone_num: phoneNumber,
            email: email,
            password: hashedPassword,
            role_id: roleId
        })
        
        let save = await user.save()
        if(!save){
            res.status(400).json({
                message: "cannot save user"
            })
        }else{
            res.status(200).json({
                message: "created user!",
                user: user
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const loginByAccount = async (req, res, next) => {
    try {
        let username = req.body.username
        let password = req.body.password
        if(!username){
            res.status(400).json({
                message: `Username is required`
            })
        }else{
            let user = await User.findOne({user_name: username})
            if(!user){
                res.status(400).json({
                    message: `Username is not exist`
                })
            }else{
                if(!password){
                    res.status(400).json({
                        message: `Password is required`
                    })
                }else{
                    if(!bcrypt.compareSync(password, user.password)){
                        res.status(400).json({
                            message: `Username or password is wrong!`
                        })
                    }else{
                        res.status(500).json({
                            message: `Login succeeded!`
                        })
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const updateUserById = async (req, res, next) => {
    try {
        let userId = req.params.userId
        if(!userId){
            res.status(400).json({
                message: `User ID required!`
            })
        }else{
            let user = await User.findOne({user_id: userId})
            let oldUser = user
            if(!user){
                res.status(400).json({
                    message: `User with ID ${userId} is not exist!`
                })
            }else{
                let phoneNumber = req.body.phoneNumber
                if(phoneNumber){
                    user.phone_num = phoneNumber
                }

                let email = req.body.email
                if(email){
                    user.email = email
                }
                let password = req.body.password
                if(password){
                    let hashedPassword = bcrypt.hashSync(password, 10)
                    user.password = hashedPassword
                }
                let roleId = req.body.roleId
                if(roleId){
                    user.role_id = roleId
                }

                let save =await user.save()
                if(!save){
                    res.status(400).json({
                        message: "cannot save user"
                    })
                }else{
                    res.status(200).json({
                        message: "updated user!",
                        before: oldUser,
                        after: user
                    })
                }
                
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        let userId = req.params.userId
        if(!userId){
            res.status(400).json({
                message: `User ID required!`
            })
        }else{
            let user = await User.findOne({user_id: userId})
            if(!user){
                res.status(400).json({
                    message: `User with ID ${userId} is not exist!`
                })
            }else{
                await User.deleteOne({user_id: userId})
                res.status(200).json({
                    message: "deleted user!",
                })
                
            }
        }
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        })
    }
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    loginByAccount
}