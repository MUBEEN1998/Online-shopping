import usermodel from "../models/usermodel.js";
import { hashedpassword,comprepassword } from "../helpers/authhelper.js";
import  JWT  from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

export const registercontroller =  async(req,res) => {
    try{
        const {name,email,password,phone,address,answer}=req.body 
        if(!name){
            res.send({error:'name is not required'})
        }

        if(!email){
            res.send({error:'email is not requiered'})
        }
        if(!password){
            res.send({error:'password  is not required'})
        }
        if(!phone){
            res.send({error:'phone  is not required'})
        }

        if(!address){
            res.send({error:'address  is not required'})
        }

        if(!answer){
          res.send({error:'answer  is not required'})
      }

        const existinguser = await usermodel.findOne({email})
        if(existinguser){
            return res.status(200).send({
                success:true,
                message:'already registerd'
            })
        }
        //register user

        const hashedpassword1 =await hashedpassword(password)
        //save
        const newuser= await new usermodel({
            name,
            email,
            password:hashedpassword1,
            phone,
            address,
            answer,
        }).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            newuser,
          });
        
    }catch(error){
        console.log(`this is error type :${error}`)
        res.status(500).send({success:false,
        message:'error in registrations'})
    }

    
    // Function implementation goes here
  };
  
//   export default registercontroller;
  

//lOGIN 

export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await usermodel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const match = await comprepassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
          answer:user.answer
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };

  export const testcontrolar = (req,res)=>{
    console.log('protect route')
  }

  //======================

export const forgotpasswordcontroller= async(req,res)=>{
    try{
      const {email,answer,newpassword}=req.body;
      if(!email){
        res.status(404).send({
          message:"email is required"
        })
      }
      if(!answer){
        res.status(404).send({
          message:"answer is required"
        })
      }
      if(!newpassword){
        res.status(404).send({
          message:"newpassword is required"
        })
      }
      const user= await usermodel.findOne({email,answer});
      if (!user){
        return res.status(404).send({
          success:false,
          message:"wrong Email or Answer"})

      }
      const hashed= await  hashedpassword(newpassword);
      await usermodel.findByIdAndUpdate(user._id,{password:hashed})  ;
      res.status(200).send({
        success:true,
        message:"Password Reset  Successfully "

      })
    }catch(erorr){
      console.log(erorr)
      res.status(200).send({
        success:false,
        message:"something is rong",
        erorr

      })
    }
}
  
//========================userprofile================
// export const updateProfile=async(req,res)=>{
// try{
//   const {name,password,address,phone}=req.body
//   const user=await usermodel.findById(req.user._id)

  
//   const hashpassword=password? await hashedpassword(password):undefined;
//   const updateuser=await usermodel.findByIdAndUpdate(req,user._id,{
//     name:name || user.name,
//     password:hashpassword || user.password,
//     phone:phone || user.phone,
//     address:address || user.address,

//   },{new:true})
//   res.status(200).send({
//     success: true,
//     message: "Profile Updated SUccessfully",
//     updateuser,
//   });

// }catch(error){
//   console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Error WHile Update profile",
//       error,
//     });

// }
// }

export const updateProfileController = async (req, res) => {
  try {
    const { name, password, address, phone,email } = req.body;
    const user = await usermodel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashPassword = password ? await hashedpassword(password) : undefined;
    const updatedUser = await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//=========================

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//orders
export const getAllOrdersController = async (req, res) => {
try {
  const orders = await orderModel
    .find({})
    .populate("products", "-photo")
    .populate("buyer", "name")
    .sort({ createdAt: "-1" });
  res.json(orders);
} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Error WHile Geting Orders",
    error,
  });
}
};
//========================
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};