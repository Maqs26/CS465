const home = (req, res) => {
    res.render("index", { title: "Home" });
};

const about = (req, res) => {
    res.render("about", { title: "About" });
};

const contact = (req, res) => {
    res.render("contact", { title: "Contact" });
};
module.exports = {
  home,
  about,
  contact
};