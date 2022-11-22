import { Router } from "express";
import { AppDataSource } from "../data-source";
const router = Router();

router.get("/", async (_, res) => {
  try {
    const jobs = await AppDataSource.query(`
SELECT t1.job_id, facility_id, t1.total_number_nurses_needed, COUNT(nurses.nurse_id)::INTEGER, t1.total_number_nurses_needed - COUNT(nurses.nurse_id)::INTEGER AS nurses_left  FROM jobs AS t1
JOIN nurse_hired_jobs ON nurse_hired_jobs.job_id =t1.job_id
JOIN nurses ON nurses.nurse_id = nurse_hired_jobs.nurse_id
WHERE nurse_hired_jobs.job_id = t1.job_id AND
nurses.nurse_type = t1.nurse_type_needed
GROUP BY facility_id, t1.job_id
ORDER BY t1.facility_id ASC, t1.nurse_type_needed DESC;

`);
    console.table(jobs);
    res.send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { router as jobRouter };
