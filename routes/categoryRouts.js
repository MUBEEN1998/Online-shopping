import express from "express";
import { isAdmin,rquiresign } from "../middlewares/authMiddleware.js";
import { createCategoryController,
     updatecategroyController,
    categoryControlller,
    singleCategoryController,
    deleteCategoryCOntroller } from "../controllers/categoryController.js";

const router =express.Router();

//Routes
router.post('/create-category',rquiresign,isAdmin,createCategoryController)
router.put('/update-category/:id',rquiresign,isAdmin,updatecategroyController)
router.get('/all-category/',categoryControlller)
router.get('/single-category/:slug',singleCategoryController)
router.delete('/delete-category/:id',rquiresign,isAdmin,deleteCategoryCOntroller)
export default router;