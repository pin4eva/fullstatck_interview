import { Router } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../entities/user.entity";
const router = Router();

const userRepo = AppDataSource.getRepository(User);

router.get("/", async (req, res) => {
  try {
    const users = await userRepo.find();
    res.send(users);
  } catch (error) {
    res.json(error);
  }
});

export { router as userRoutes };
