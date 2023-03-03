import User from '../mongodb/models/user.js';

//controller is just a function, and those are usually async since they take some time to do things with the database

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).limit(req.query._end)
        //User.find({}) returns an array of all users

        res.status(200).json(users) //send the array of users to the FE
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createUser = async (req, res) => {

    try {
        //get data from the FE (req.body) and save it to the database
        const { name, email, avatar } = req.body;

        //check if user exists via their email
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(200).json(userExists);

        //if user does not exist, create a new user
        const newUser = await User.create({
            name,
            email,
            avatar
        })

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const getUserInfoByID = async (req, res) => {

    try {
        const { id } = req.params; //get the id from the url/params for the user we want to get info for

        const user = await User.findOne({ _id: id }).populate('allProperties') //populate all properties of the user. 
        if (user) {
            res.status(200).json(user); //Returns all the data and properties about the user.
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export {
    getAllUsers,
    createUser,
    getUserInfoByID,
}
