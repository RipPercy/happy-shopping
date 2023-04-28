import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//Routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//Get Products
router.get("/get-product", getProductController);

//Get Single Product
router.get("/get-product/:slug", getSingleProductController);

//Get Photo
router.get("/product-photo/:pid", productPhotoController);

//Delete Product
router.delete("/delete-product/:pid", deleteProductController);

//Filter Product
router.post("/product-filters", productFiltersController);

//Product Count
router.get("/product-count", productCountController);

//Product Per Page
router.get("/product-list/:page", productListController);

//Search Product
router.get("/search/:keyword", searchProductController);

//Similar Product
router.get("/related-product/:pid/:cid", relatedProductController);

//Category wise product
router.get("/product-category/:slug", productCategoryController);

//Payment Routes
//Token
router.get("/braintree/token", braintreeTokenController);

//Payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
