import { connectDatabase } from "./config/database";
import express from "express";
import path from "path";
import baseRouter from "./routes/index";
import BodyParser from "body-parser";
import Cors from "cors"
import fs from "fs";

const startApp = async () => {
  const app = express();
  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({ extended: true }));

  app.use(Cors());
  

  // Database connection
  await connectDatabase();

  const uploadsDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  app.use("/api", baseRouter());
  app.use("/uploads", express.static(uploadsDir));

  // Start the server
  const PORT = process.env.PORT || 6001;
  app.listen(PORT, () => {
    console.log(
      `Server is running on port ${PORT}  -- ${process.env.NODE_ENV}`
    );
  });
};

// Start the application - self invoking function
(async () => {
  try {
    await startApp();
  } catch (error) {
    console.error("Error starting the application:", error);
    process.exit(1);
  }
})();
