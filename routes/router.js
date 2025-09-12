const express = require("express");
const path = require("path");
const shopController = require("../controllers/shopController");
const userController = require("../controllers/userController");

const router = express.Router();
//----------------------------------------------
router.use(express.static(path.join(__dirname, "../public")));

router.get("/brandhouse/catalog", shopController.getCatalog);

router.get("/brandhouse/catalog/product", shopController.getProductCard);

router.get("/brandhouse/shopping-cart", shopController.getShoppingCart);

router.get("/brandhouse/register", shopController.getRegister);

router.get("/brandhouse/logIn", shopController.getLog);

router.get("/brandhouse/verification", shopController.getVerification)

router.get("/brandhouse/personalAccount", shopController.getPersonalAccount)

router.get("/brandhouse/aboutUs", shopController.getAboutPage)

router.get("/brandhouse/paymentInfo", shopController.paymentInfo)

router.get("/brandhouse/deliveryInfo", shopController.deliveryInfo)

router.use(express.json());

router.post("/brandhouse/checkUser",userController.checkUser);

router.post("/brandhouse/authorisation", userController.userLog);

router.post("/brandhouse/newUser", userController.newUser);

router.post("/brandhouse/addToCart", shopController.productAdd);

router.post("/brandhouse/confirmOrder", userController.confirmOrder);

router.post("/brandhouse/checkCode",userController.checkCode)

router.post("/brandhouse/product/addReview",shopController.addReview)

router.post("/brandhouse/resendCode",userController.resendCode)

router.delete("/brandhouse/logOut", userController.logOut);


router.put("/brandhouse/updateUserInfo", userController.updateInfo);


router.delete("/brandhouse/shopping-cart/deleteFromCart", shopController.deleteFromCart);


module.exports = router;