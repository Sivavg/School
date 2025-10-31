// const Complain = require('../models/complainSchema.js');

// const complainCreate = async (req, res) => {
//     try {
//         const complain = new Complain(req.body)
//         const result = await complain.save()
//         res.send(result)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// const complainList = async (req, res) => {
//     try {
//         let complains = await Complain.find({ school: req.params.id }).populate("user", "name");
//         if (complains.length > 0) {
//             res.send(complains)
//         } else {
//             res.send({ message: "No complains found" });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// module.exports = { complainCreate, complainList };


const Complain = require('../models/complainSchema.js');

// Create a new complain
const complainCreate = async (req, res) => {
    try {
        // Create a new complain instance using the request body
        const complain = new Complain(req.body);
        const result = await complain.save();  // Save complain to the database
        res.send(result);  // Send the result back to the client
    } catch (err) {
        res.status(500).json(err);  // Send error response in case of an issue
    }
};

// List all complains related to a specific school
const complainList = async (req, res) => {
    try {
        // Find all complains associated with the school specified in the URL
        let complains = await Complain.find({ school: req.params.id }).populate("user", "name");
        
        if (complains.length > 0) {
            res.send(complains);  // Send the list of complains if found
        } else {
            res.send({ message: "No complains found" });  // If no complains found, return this message
        }
    } catch (err) {
        res.status(500).json(err);  // Send error response in case of an issue
    }
};

// Delete a specific complain by its ID
const deleteComplain = async (req, res) => {
    try {
        // Find and delete the complain by ID
        const result = await Complain.findByIdAndDelete(req.params.id);
        
        if (!result) {
            // If the complain isn't found, return a 404 status
            return res.status(404).send({ message: "Complain not found" });
        }
        
        res.send(result);  // Send the result of the delete operation
    } catch (error) {
        res.status(500).json(error);  // Send error response in case of an issue
    }
};

// Delete all complains associated with a specific school
const deleteComplains = async (req, res) => {
    try {
        // Delete all complains related to the specified school
        const result = await Complain.deleteMany({ school: req.params.id });
        
        if (result.deletedCount === 0) {
            // If no complains are deleted, return this message
            return res.send({ message: "No complains found to delete" });
        }
        
        res.send(result);  // Send the result of the delete operation
    } catch (error) {
        res.status(500).json(error);  // Send error response in case of an issue
    }
};

module.exports = { complainCreate, complainList, deleteComplain, deleteComplains };
