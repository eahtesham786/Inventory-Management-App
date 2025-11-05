import path from "path";
import ProductModel from "../models/product.model.js";
export default class ProductController {
  getproducts(req, res) {
    console.log("Absolute Path:", path.resolve());
    let products = ProductModel.get();
    console.log(products);
    // const finalpath = path.join(path.resolve(), "src", "views", "products.ejs");
    // console.log("Final Path:", finalpath);
    // return res.sendFile(finalpath);
    res.render("products", { products: products });
  }
}
