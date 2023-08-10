import express from "express";
import formidable from "express-formidable";
import { isAdmin,rquiresign } from "../middlewares/authMiddleware.js";

import { allproducts, createProduct, deleteProductController, productPhotoController, singleproduct,
     updateProductController,productFiltersController,productCountController,
     productListController,searchProductController,realtedProductController,brainTreePaymentController,
     braintreeTokenController,productCategoryController} from "../controllers/productcontrol.js";
const router = express.Router();

router.post("/create-product",rquiresign,isAdmin,formidable(), createProduct )
router.get("/all-product",allproducts )
router.get("/single-product/:slug",singleproduct )
router.get("/product-photo/:pid",productPhotoController);

router.post("/product-filters", productFiltersController);
router.get("/product-count", productCountController);
router.get("/search/:keyword", searchProductController);
router.get("/related-product/:pid/:cid", realtedProductController);

router.get("/braintree/token", braintreeTokenController);
router.get("/product-category/:slug",productCategoryController);

//payments
router.post("/braintree/payment",rquiresign, brainTreePaymentController);




router.get("/product-list/:page", productListController);



//delete rproduct
router.delete("/delete-product/:pid",deleteProductController);
router.put("/update-product/:pid",rquiresign,isAdmin,formidable(),updateProductController);

export default router;  