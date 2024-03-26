import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  addToCartController,
  getCartController,
  getAllOrdersController,
  orderStatusController,
  removeFromCartController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//RESISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//forgot password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order update status
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

//cart
router.post("/add-to-cart", requireSignIn, addToCartController);
router.post("/remove-from-cart", requireSignIn, removeFromCartController);
router.get("/cart", requireSignIn, getCartController);

export default router;
