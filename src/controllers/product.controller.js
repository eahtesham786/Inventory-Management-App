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
    res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }
  getAddForm(req, res) {
    //controller method to return the form (to see the form)
    return res.render("new-product", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    }); //no data to send here, also it is optional attribute
  }
  addNewProduct(req, res) {
    const { name, desc, price } = req.body;
    const imageUrl = "/images/" + req.file.filename;
    //access the data when form is submitted
    console.log(req.body);
    console.log(imageUrl);
    ProductModel.add(name, desc, price, imageUrl);
    let products = ProductModel.get();
    res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    }); //after adding we need to come back to product page
    //return res.send();
  }
  //to update our existing product
  getUpdateProductView(req, res, next) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        //return the view if product found
        product: productFound,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    } else {
      res.status(401).send("Product not found"); //else return the error message
    }
  }
  postUpdateProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(404).send("Product not found");
    }
    // Keep old image by default
    let updatedImageUrl = productFound.imageUrl;

    // If user uploaded a new file, replace image
    if (req.file) {
      updatedImageUrl = "/images/" + req.file.filename;
    }
    const updatedProduct = {
      id: id,
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      imageUrl: updatedImageUrl, // <- comes from file OR keeps the old one
    };
    ProductModel.update(updatedProduct);
    var products = ProductModel.get();
    res.render("products", { products, userEmail: req.session.userEmail });
  }
  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Prodcut not found");
    }
    ProductModel.delete(id);
    let products = ProductModel.get();
    res.render("products", { products });
  }
}
