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
  getAddForm(req, res) {
    //controller method to return the form (to see the form)
    return res.render("new-product", {}); //no data to send here, also it is optional attribute
  }
  addNewProduct(req, res) {
    //access the data when form is submitted
    console.log(req.body);
    ProductModel.add(req.body);
    let products = ProductModel.get();
    res.render("products", { products: products }); //after adding we need to come back to product page
    //eturn res.send();
  }
}
