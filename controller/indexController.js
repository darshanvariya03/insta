const bcrypt = require('bcrypt')
const registerModel = require('../models/registerModel');
const UserMOdel = require('../models/userModel')

const dashbord = async(req,res) => {
    try{
        let record = await UserMOdel.find({});
        if(record){
            console.log(record);
            return res.render('dashbord', { record });
        }else{
            return res.redirect('/')
        }
    }catch(err){
        console.log(err);
        return false;
    }
}
const login = (req,res) => {
    return res.redirect('/dashbord');
}

const index = (req,res) => {
    return res.render('login')
}

const register = (req,res) => {
    return res.render('register')
}

const registerUser = async (req, res) => {
  try {
      const { name, email, password, cpassword } = req.body;

      if (password !== cpassword) {
          console.log("Password and Confirm password is not match..!");
          return res.redirect('back');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await registerModel.create({
          name,
          email,
          password: hashedPassword,
      });

      console.log('Register successfully:', user);
      return res.redirect('/');
  } catch (err) {
      console.error(err);
      return false;
  }
};

module.exports = {
    dashbord, login, index,register,registerUser, 
}