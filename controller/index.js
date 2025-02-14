import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from "fs";

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

let PORT = 3000;

app.get("/", (req, res) => res.render("home/index"));
app.get("/home", (req, res) => res.render("home/index"));
app.get("/Sign-in", (req, res) => res.render("login/loginregisterForm"));

// Handle Form Submission with Image Upload
app.post("/Sign/data", upload.single("profileImage"), (req, res) => {
  console.log(req.body); // Logs form data
  console.log(req.file); // Logs uploaded file details
  res.render("home/index");
});
app.get("/menu", (req, res) => {
  const navbarPath = "C:\\Users\\user\\OneDrive\\Desktop\\E-commerce website\\views\\home\\Navbar.ejs";

    res.render("menu/menu");
  });

app.get("/nav", (req, res) => {
  res.render("home/Navbar");
});
app.listen(PORT, () => console.log(`Listening at ${PORT}`));
