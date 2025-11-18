import express from "express";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import session from "express-session";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import validateRequest from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setlastVisit } from "./src/middlewares/lastVisit.middleware.js";
const server = express();

server.use(cookieParser());
//server.use(setlastVisit);   no need to apply to all the request
server.use(express.static("public"));
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, //http protocol isn't secure
  })
);
server.use(ejsLayouts);
//parse form data
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.set("view engine", "ejs"); //setting the ejs view engine
server.set("views", path.join(path.resolve(), "src", "views"));
server.use(express.static("src/views"));
const productController = new ProductController();
const userController = new UserController();
server.get("/", setlastVisit, auth, productController.getproducts);
server.get("/new", auth, productController.getAddForm);
server.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validateRequest,
  productController.addNewProduct
); //validation middleware applied only to this request
server.get("/register", userController.getRegister);
server.get("/login", userController.getLogin);
server.post("/login", userController.postLogin);
server.post("/register", userController.postRegister);
server.get("/logout", userController.logout);
server.get(
  "/update-product/:id",
  auth,
  uploadFile.single("imageUrl"),
  productController.getUpdateProductView
);
server.post(
  "/update-product/:id",
  auth,
  uploadFile.single("imageUrl"),
  productController.postUpdateProduct
); //to update the data
server.post("/delete-product/:id", auth, productController.deleteProduct);
server.listen(3000, () => {
  console.log(`Server is listening on http://localhost:3000/`);
});
