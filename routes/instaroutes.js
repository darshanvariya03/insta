const express = require('express');

const routes = express.Router();

const instaController = require('../controller/instaController');

const multer = require('multer');

//file upload
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads")
    },
    filename : (req,file,cb) => {
        let img = Date.now()+"-"+file.originalname
        cb(null,img);
    }
})
const fileUpload = multer({storage : storage}).single('image');

// routes.get('/',instaController.viewPost);
routes.get('/add',instaController.add);
routes.post('/addData',fileUpload,instaController.addData);
routes.get('/deleteData',instaController.deleteData);
routes.get('/editData',instaController.editData);
routes.post('/updateData',instaController.updateData);



module.exports = routes;
