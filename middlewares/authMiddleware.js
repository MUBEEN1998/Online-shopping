import JWT from 'jsonwebtoken'
import usermodel from '../models/usermodel.js';
//Protected Routes 
export const rquiresign = async (req,res,next)=>{
//     try{
//     const decode = await JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
//     req.user=decode;
//     next();
//     }catch (error){
//         console.log(error)
//     }
// }
try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
   console.log(error);
  }
};

//==================
// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await usermodel.findById(req.user._id);
//     console.log(user._id)
//     if (user.role !== 1) {
//       return res.status(401).send({
//         success: false,
//         message: "UnAuthorized Access",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       error,
//       message: "Error in admin middelware",
//     });
//   }
// };
export const isAdmin = async (req, res, next) => {
  try {
    
    const user = await usermodel.findById(req.user._id);
    console.log(user.id)
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};