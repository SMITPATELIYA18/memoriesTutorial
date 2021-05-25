import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./Routes/Posts.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

// const CONNECTION_URL =
//  "mongodb+srv://meroriesTutorial:meroriesTutorial18@cms.ypnxp.mongodb.net/MemoriesTutorial?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running on the port: ${PORT}`)
    )
  )
  .catch((error) => console.log(`Error: ${error}`));

mongoose.set("useFindAndModify", false);
