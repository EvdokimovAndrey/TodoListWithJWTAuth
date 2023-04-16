module.exports = function(req, res, next) {
    const { login, name, password } = req.body;
  
    function validLogin(userLogin) {
      return /^\S*$/.test(userLogin);
    }

    if (req.path === "/register") {
      console.log(!login.length);
      if (![login, name, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validLogin(login)) {
        return res.json("Invalid Login");
      }
    } else if (req.path === "/login") {
      if (![login, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validLogin(login)) {
        return res.json("Invalid Login");
      }
    }
  
    next();
  };