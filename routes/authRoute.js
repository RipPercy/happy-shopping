import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  updateAdminProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//Router object
const router = express.Router();

//Routing
//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//Protected Route Auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected Admin Route Auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Update Profile
router.put("/profile", requireSignIn, updateProfileController);

//Update Admin Profile
router.put(
  "/admin/profile",
  requireSignIn,
  isAdmin,
  updateAdminProfileController
);

//Orders
router.get("/orders", requireSignIn, getOrdersController);

//All Orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//Order Status Update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
