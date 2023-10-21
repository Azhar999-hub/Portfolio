const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const skillRouter = require("./routes/skillRoute");
const projectRouter = require("./routes/projectRoute");
const messageRouter = require("./routes/messageRoute");
const experienceRouter = require("./routes/exprienceRoute");
const educationRouter = require("./routes/educationRoute");
const aboutRouter = require("./routes/aboutMeRoute");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

app.use("/user", userRouter);
app.use("/skills", skillRouter);
app.use("/projects", projectRouter);
app.use("/messages", messageRouter);
app.use("/experience", experienceRouter);
app.use("/education", educationRouter);
app.use("/about", aboutRouter);

app.get('/', (req, res)=>{
  app.use(express.static(path.resolve(__dirname,'client','build')))
  res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})

const fs = require("fs");


const uploadFolder = "uploads";

// Check if the uploads folder exists, and create it if not
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(
      PORT,
      console.log(
        `Server is Running on ${PORT} and also Database Connected Successfully`
      )
    );
  })
  .catch((error) => {
    console.log(`Database Connection Failed!" ${error}`);
  });
