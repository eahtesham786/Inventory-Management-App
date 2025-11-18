import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";
export default class UserController {
  getRegister(req, res) {
    res.render("register"); //rendering the register page
  }
  getLogin(req, res) {
    res.render("login", { errorMessage: null }); //rendering the login page
  }
  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    console.log("User registered:", { name, email, password });
    res.render("login", { errorMessage: null }); //after registering it will render the login page
  }
  postLogin(req, res) {
    const { email, password } = req.body;
    console.log("Login Attempt:", email, password);
    const user = UserModel.isValidUser(email, password);
    console.log("Result from the UserModel:", user);

    if (!user) {
      return res.render("login", { errorMessage: "Invalid Credentials." });
    }
    req.session.userEmail = email;
    let products = ProductModel.get();
    console.log(products);
    res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    });
    res.clearCookie("lastVisit"); //clear the cookie
  }
}
