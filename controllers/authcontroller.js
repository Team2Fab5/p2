var exports = (module.exports = {});

exports.signup = function (req, res) {
  res.render("signup");
};
exports.signin = function (req, res) {
  res.render("signin");
};

exports.dashboard = function (req, res) {
  res.render("dashboard");
};
exports.user = function (req, res) {
  res.render("user");
};
exports.task = function (req, res) {
  res.render("task");
};
exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
}