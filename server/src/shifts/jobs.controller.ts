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

// Question 5

router.get("/q5", async (req, res) => {
  try {
    const nurses = await AppDataSource.query(`
      SELECT n.nurse_id, n.nurse_name, n.nurse_type, q.total_opening - (
	SELECT COUNT(*)  FROM jobs
  JOIN nurse_hired_jobs ON nurse_hired_jobs.job_id = jobs.job_id
  JOIN nurses ON nurses.nurse_id = nurse_hired_jobs.nurse_id
  WHERE n.nurse_id = nurse_hired_jobs.nurse_id

)::INTEGER AS can_apply_for  FROM nurses AS n
JOIN (
	SELECT nurse_type_needed, SUM(total_number_nurses_needed) AS total_opening FROM jobs
	GROUP BY nurse_type_needed
) q ON q.nurse_type_needed = n.nurse_type
ORDER BY n.nurse_id ASC

`);

    res.send(nurses);
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as jobRouter };
