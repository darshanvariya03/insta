const usermodel = require('../models/userModel');
const registerModel = require('../models/registerModel');

const fs = require('fs');
const path = require('path');

// const viewPost = async (req, res) => {
//     // try {
//     //     let record = await usermodel.find({});
//     //     console.log(record);

//     //     if (!record) {
//     //         console.log('No records found.');
//     //         return false
//     //     }

//     //     res.render('dashbord', { record });
//     // } catch (err) { 
//     //     console.log(err);
//     //     return false
//     // }
//     return res.render('login')
// }


const add = (req, res) => {
    return res.render('add');
}


const addData = async (req, res) => {
    try {
        const { des } = req.body;

        let postAdd = await usermodel.create({
            des, avatar: req.file.path
        });

        if (postAdd) {
            console.log("Post Added ");
            return res.redirect('/dashbord');
        } else {
            console.log('Invalid');
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteData = async (req, res) => {
    try {
        const deleterecord = await usermodel.findById(req.query.id);

        if (!deleterecord) {
            console.log("Record not found");
            return false
        }

        if (deleterecord.avatar) {
            fs.unlinkSync(deleterecord.avatar);
        }

        const del = await usermodel.findByIdAndDelete(req.query.id);

        if (!del) {
            console.log("Error");
            return false
        }

        console.log("Record deleted");
        return res.redirect('/dashbord');
    } catch (err) {
        console.error(err);
        return false
    }
};  



const editData = async (req, res) => {
    try {
        const id = req.query.id;
        const single = await usermodel.findById(id);

        if (!single) {
            console.log("Record not found");
            return res.redirect('/dashbord');
        }

        return res.render('edit', { single });
    } catch (err) {
        console.error(err);
        return res.redirect('/dashbord');
    }
}

const updateData = async (req, res) => {
    try {
        if (req.file) {
            let imageupdate = await usermodel.findById(req.body.id);
            fs.unlinkSync(imageupdate.image);

            let updateRecord = await usermodel.findByIdAndUpdate(req.body.id, {
                des: req.body.des,
                image: req.file.path,
            })
            return res.redirect('/dashbord');
        }
        else {
            let record = await usermodel.findById(req.body.id);
            let updaterecord = await usermodel.findByIdAndUpdate(req.body.id, {
                des: req.body.des,
            })
            if(updaterecord){
                console.log('record updated');
            }
            return res.redirect('/dashbord');
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    add,
    addData,
    deleteData,
    editData,
    updateData
};


module.exports = {
    add,
    addData,
    deleteData,
    editData,
    updateData  // Added the updateData function
};




