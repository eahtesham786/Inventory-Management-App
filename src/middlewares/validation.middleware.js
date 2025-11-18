// const validateRequest = (req, res, next) => {
//   //validate data
//   const { name, price, imageUrl } = req.body;
//   let errors = [];
//   if (!name || name.trim() == "") {
//     //if name is not defined or trimmed name is empty
//     errors.push("name is required");
//   }
//   if (!price || parseFloat(price) < 1) {
//     errors.push("Price must be a positive value.");
//   }
//   try {
//     const validUrl = new URL(imageUrl);
//   } catch (err) {
//     errors.push("Url is invalid");
//   }
//   if (errors.length > 0) {
//     return res.render("new-product", {
//       errorMessage: errors[0], //you can pass one error or all the errors.
//     });
//   }
//   next();
// };
import { body, validationResult } from "express-validator";

const validateRequest = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is Required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be positive value."),
    body("file").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required."); //if file is empty
      }
      return true; //if file is not empty, then return true
    }),
  ];
  //body("imageUrl").isURL().withMessage("Invalid URL"),
  // //this should now expect a file instead of url since we added filupload  midlleware

  await Promise.all(rules.map((rule) => rule.run(req)));
  var errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: errors.array()[0].msg,
    });
  }
  next();
};

export default validateRequest;
