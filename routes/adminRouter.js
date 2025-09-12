const express = require("express");
const path = require("path");
const adminController = require("../controllers/adminController");
const { checkAuth } = require("../middleware/auth.middleware");


const adminRouter = express.Router();



adminRouter.use(checkAuth);

adminRouter.use(express.static(path.join(__dirname, "../private")));

adminRouter.get("/adminCatalog", adminController.getCatalog);

adminRouter.get("/adminCatalog/productEdit", adminController.getCard);

adminRouter.get("/creationCard",adminController.getCreationCard);


adminRouter.use(express.json());

adminRouter.post("/createProduct",adminController.createProduct);

adminRouter.put("/changeProduct",adminController.changeProduct);

adminRouter.delete("/product/delete",adminController.deleteProduct);

module.exports=adminRouter;