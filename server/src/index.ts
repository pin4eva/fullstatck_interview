import * as express from "express";
import { AppDataSource } from "./data-source";
import { config } from "dotenv";
import * as cors from "cors";
import { userRoutes } from "./users/controllers/user.controller";
import { shiftRouter } from "./shifts/shift.controller";
import { jobRouter } from "./shifts/jobs.controller";

config();
const productionOrigins = ["https://localhost:3000"];
const PORT = +process.env.PORT || 8000;
AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(express.json());
    app.use(
      cors({
        origin:
          process.env.NODE_ENV === "development" ? true : productionOrigins,
        credentials: true,
      })
    );

    // setup express routes
    app.use("/users", userRoutes);
    app.use("/facilities", shiftRouter);
    app.use("/jobs", jobRouter);

    // start express server
    app.listen(PORT, () => {
      console.log(`Express server has started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
