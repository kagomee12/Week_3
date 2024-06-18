const express = require("express");
const path = require("path");
let data = [];

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.urlencoded({ extended: false }));

app.use("/logo", express.static(path.join(__dirname, "src/logo")));

app.get("/home", home);
app.get("/myproject", myproject);
app.post("/myproject", addBlog);
app.get("/detailblog/:id", detailblog);
app.get("/testimonial", testimonial);
app.get("/contact_me", contact_me);

function duration(awal, akhir) {
  const tanggalawal = new Date(awal);
  const tanggalakhir = new Date(akhir);

  const dis = tanggalakhir - tanggalawal;

  const dHours = Math.floor(dis / 1000 / 60 / 60);
  const dDay = Math.floor(dis / 1000 / 60 / 60 / 24);
  const dMounth = Math.floor(dis / 1000 / 60 / 60 / 24 / 30);
  const dyear = Math.floor(dis / 1000 / 60 / 60 / 24 / 30 / 12);

  if (dyear > 0) {
    return `${dyear} Year`;
  } else if (dMounth > 0) {
    return `${dMounth} Mounth`;
  } else if (dDay > 0) {
    return `${dDay} Day`;
  } else if (dHours > 0) {
  }
}

function home(req, res) {
  res.render("index", { data });
}
function myproject(req, res) {
  res.render("myproject");
}

function addBlog(req, res) {
  const {
    judul,
    startdate,
    enddate,
    content,
    nodejs,
    reactjs,
    nextjs,
    typescript,
    inputimage,

  } = req.body;

  // inputimage = URL.createObjectURL(inputimage[0]);
  // const image = URL.createObjectURL(inputimage[0]);

  const durasi = duration(startdate, enddate);

  let nodejsicon = "";
  let reactjsicon = "";
  let nextjsicon = "";
  let typescripticon = "";
  let nodejstext = "";
  let reactjstext = "";
  let nextjstext = "";
  let typescripttext = "";

  if (nodejs == "true") {
    nodejsicon = "fa-brands fa-google-play";
    nodejstext = "Nodejs";
  }

  if (reactjs == "true") {
    reactjsicon = "fa-brands fa-android";
    reactjstext = "Reactjs";
  }

  if (nextjs == "true") {
    nextjsicon = "fa-brands fa-js";
    nextjstext = "Nextjs";
  }
  if (typescript == "true") {
    typescripticon = "fa-brands fa-apple";
    typescripttext = "typescript";
  }

  let tglawal = startdate.split("-").reverse().join("-");
  let tglakhir = enddate.split("-").reverse().join("-");

  const dataBlog = {
    judul,
    startdate,
    enddate,
    durasi,
    content,
    nodejs,
    reactjs,
    nextjs,
    typescript,
    inputimage,
    nodejsicon,
    reactjsicon,
    nextjsicon,
    typescripticon,
    tglawal,
    tglakhir,
    nodejstext,
    reactjstext,
    nextjstext,
    typescripttext,
  };

  console.log("Title :", judul);
  console.log("stardate :", startdate);
  console.log("enddate :", enddate);
  console.log("durasi :", durasi);
  console.log("content :", content);
  console.log("nodejs :", nodejs);
  console.log("reactjs :", reactjs);
  console.log("nextjs :", nextjs);
  console.log("typescript :", typescript);
  console.log("image :", inputimage);

  const uwu = data.unshift(dataBlog);

  console.log(uwu);

  res.redirect("/home");
}

function detailblog(req, res) {
  const { id } = req.params;

  const detail = data[id];

  res.render("detailblog", { detail });

  console.log("ID:", id);
}

function testimonial(req, res) {
  res.render("testimonial");
}
function contact_me(req, res) {
  res.render("contact_me");
}


app.listen(3000);
