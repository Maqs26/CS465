const home = (req, res) => {
    res.render("index", { title: "Home" });
};

const about = (req, res) => {
    res.render("about", { title: "About" });
};

const contact = (req, res) => {
    res.render("contact", { title: "Contact" });
};


const travel = (req, res) => {
    const trips = [
        {
            name: "Gale Reef",
            description: "Beautiful reef with amazing views.",
            image: "/images/reef1.jpg"
        },
        {
            name: "Dawson’s Reef",
            description: "Crystal clear water and marine life.",
            image: "/images/reef2.jpg"
        },
        {
            name: "Claire’s Reef",
            description: "Perfect for diving and exploration.",
            image: "/images/reef3.jpg"
        }
    ];

    res.render("travel", {
        title: "Travel",
        trips: trips
    });
};

const rooms = (req, res) => {
    res.render("rooms", { title: "Rooms" });
};

const meals = (req, res) => {
    res.render("meals", { title: "Meals" });
};

const news = (req, res) => {
    res.render("news", { title: "News" });
};

module.exports = {
  home,
  about,
  contact,
  travel,
  rooms,
  meals,
  news
};