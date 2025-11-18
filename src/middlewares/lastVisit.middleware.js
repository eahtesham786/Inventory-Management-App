export const setlastVisit = (req, res, next) => {
  if (req.cookies.lastVisit) {
    //if we have received a cookie
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString(); //then add a varaible to the response
  }
  res.cookie("lastVisit", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  next();
};
