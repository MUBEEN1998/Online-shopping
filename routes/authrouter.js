
import express from 'express';
import{ registercontroller,
    loginController,
    testcontrolar,
    forgotpasswordcontroller,

    updateProfileController,getOrdersController,getAllOrdersController,orderStatusController
 }from '../controllers/authcontrol.js';
import { rquiresign,isAdmin } from '../middlewares/authMiddleware.js';
//router objects
//register
const router = express.Router()

router.post("/register",registercontroller);
router.post("/login",loginController);
router.get("/test",rquiresign, testcontrolar);

router.get("/user-auth",rquiresign, (req, res) => {
    res.status(200).send({ ok: true });
  });
  //protected Admin route auth
  router.get("/admin-auth", rquiresign, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

router.post("/forgot-password" ,forgotpasswordcontroller);

router.put("/profile", rquiresign, updateProfileController);

//==================
router.get("/orders", rquiresign, getOrdersController);

//all orders
router.get("/all-orders", rquiresign, isAdmin, getAllOrdersController);

router.put(
  "/order-status/:orderId",rquiresign,isAdmin,
  orderStatusController
);


export default router ;