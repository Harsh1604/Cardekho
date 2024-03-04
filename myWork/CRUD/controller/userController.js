import User from "../model/userModel.js";

// logic for getting all users from database
export const fetch = async(req, res) =>{
    try {
        const users = await User.find();
        if(users.length === 0){
              return res.status(404).json({message: "user not found"});
        }
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}


// logic for creating new user from database
export const create = async(req, res) =>{
    try {

        const userData = new User(req.body);
        const {email} = userData;
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message: "User already exist"});
        }
        const savedUser = await userData.save();
        res.status(200).json(savedUser);    

    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}


// logic for update a user
export const update = async (req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findOne({_id:id})
        if(!userExist){
            return res.status(404).json({message: "user not found"});
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true})
        res.status(201).json(updatedUser);
        
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}


// logic for delete a user from database
export const deleteUser = async (req, res) =>{
       try {

         const id = req.params.id;
         const userExist = await User.findOne({_id:id})
         if(!userExist){
            return res.status(404).json({message: "user not found"});
         }

        await User.findByIdAndDelete(id);
        res.status(201).json({message: "user deleted successfully"});
    
       } catch (error) {
           res.status(500).json({error: "Internal server error"});
       }
}



//using promises
//import User from "../model/userModel.js";

// Logic for getting all users from the database
// export const fetch = (req, res) => {
//     User.find()
//         .then(users => {
//             if (users.length === 0) {
//                 return res.status(404).json({ message: "User not found" });
//             }
//             res.status(200).json(users);
//         })
//         .catch(error => {
//             res.status(500).json({ error: "Internal server error" });
//         });
// };

// // Logic for creating a new user in the database
// export const create = (req, res) => {
//     const userData = new User(req.body);
//     const { email } = userData;
//     User.findOne({ email })
//         .then(userExist => {
//             if (userExist) {
//                 return res.status(400).json({ message: "User already exists" });
//             }
//             userData.save()
//                 .then(savedUser => {
//                     res.status(200).json(savedUser);
//                 })
//                 .catch(error => {
//                     res.status(500).json({ error: "Internal server error" });
//                 });
//         })
//         .catch(error => {
//             res.status(500).json({ error: "Internal server error" });
//         });
// };

// // Logic for updating a user in the database
// export const update = (req, res) => {
//     const id = req.params.id;
//     User.findOne({ _id: id })
//         .then(userExist => {
//             if (!userExist) {
//                 return res.status(404).json({ message: "User not found" });
//             }
//             User.findByIdAndUpdate(id, req.body, { new: true })
//                 .then(updatedUser => {
//                     res.status(201).json(updatedUser);
//                 }) 
//                 .catch(error => {
//                     res.status(500).json({ error: "Internal server error" });
//                 });
//         })
//         .catch(error => {
//             res.status(500).json({ error: "Internal server error" });
//         });
// };

// // Logic for deleting a user from the database
// export const deleteUser = (req, res) => {
//     const id = req.params.id;
//     User.findOne({ _id: id })
//         .then(userExist => {
//             if (!userExist) {
//                 return res.status(404).json({ message: "User not found" });
//             }
//             User.findByIdAndDelete(id)
//                 .then(() => {
//                     res.status(201).json({ message: "User deleted successfully" });
//                 })
//                 .catch(error => {
//                     res.status(500).json({ error: "Internal server error" });
//                 });
//         })
//         .catch(error => {
//             res.status(500).json({ error: "Internal server error" });
//         });
// };






/*
//using callbacks
import User from "../model/userModel.js";

// Logic for getting all users from the database
export const fetch = (req, res) => {
    User.find({}, (error, users) => {
        if (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(users);
    });
};

// Logic for creating a new user in the database
export const create = (req, res) => {
    const userData = new User(req.body);
    const { email } = userData;
    User.findOne({ email }, (error, userExist) => {
        if (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        userData.save((error, savedUser) => {
            if (error) {
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(200).json(savedUser);
        });
    });
};









// Logic for updating a user in the database
export const update = (req, res) => {
    const id = req.params.id;
    User.findOne({ _id: id }, (error, userExist) => {
        if (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        User.findByIdAndUpdate(id, req.body, { new: true }, (error, updatedUser) => {
            if (error) {
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(201).json(updatedUser);
        });
    });
};

// Logic for deleting a user from the database
export const deleteUser = (req, res) => {
    const id = req.params.id;
    User.findOne({ _id: id }, (error, userExist) => {
        if (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        User.findByIdAndDelete(id, (error) => {
            if (error) {
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(201).json({ message: "User deleted successfully" });
        });
    });
};*/


