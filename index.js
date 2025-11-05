import express from "express";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import ProductController from "./src/controllers/product.controller.js";
const server = express();
server.use(ejsLayouts);
server.set("view engine", "ejs"); //setting the ejs view engine
server.set("views", path.join(path.resolve(), "src", "views"));
server.use(express.static("src/views"));
const productController = new ProductController();
server.get("/", productController.getproducts);

server.listen(3000, () => {
  console.log(`Server is listening on http://localhost:3000/`);
});
