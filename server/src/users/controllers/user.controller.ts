import { Router } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../entities/user.entity";
const router = Router();

const userRepo = AppDataSource.getRepository(User);

router.post("/", async (req, res) => {
  try {
    const user = new User();
    user.age = +req.body.age;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    await userRepo.save(user);
    res.send(user);
  } catch (error) {
    res.json(error);
  }
});

router.get("/", async (_, res) => {
  try {
    const users = await userRepo.find();
    res.send(users);
  } catch (error) {
    res.json(error);
  }
});

export { router as userRoutes };
