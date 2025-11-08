import express from "express";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import ProductController from "./src/controllers/product.controller.js";
import validateRequest from "./src/middlewares/validation.middleware.js";
const server = express();

server.use(express.static("public"));
server.use(ejsLayouts);
//parse form data
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.set("view engine", "ejs"); //setting the ejs view engine
server.set("views", path.join(path.resolve(), "src", "views"));
server.use(express.static("src/views"));
const productController = new ProductController();
server.get("/", productController.getproducts);
server.get("/new", productController.getAddForm);
server.post("/", validateRequest, productController.addNewProduct); //validation middleware applied only to this request
server.get("/update-product/:id", productController.getUpdateProductView);
server.post("/update-product", productController.postUpdateProduct); //to update the data
server.post("/delete-product/:id", productController.deleteProduct);
server.listen(3000, () => {
  console.log(`Server is listening on http://localhost:3000/`);
});
