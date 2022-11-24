import { Router } from "express";
import { AppDataSource } from "../data-source";
import { GetShiftOverlapResult } from "../classes/all.classes";
import * as dayjs from "dayjs";

const router = Router();

// get all shift
router.get("/", async (_, res) => {
  try {
    const shifts =
      await AppDataSource.query(`SELECT *, (shift_date+start_time)::TIMESTAMP as start_date_time, (shift_date+end_time)::TIMESTAMP as end_date_time FROM question_one_shifts
JOIN facilities on facilities.facility_id = question_one_shifts.facility_id;
`);
    res.send(shifts);
  } catch (error) {
    res.json(error);
  }
});

// get shift overlap
router.get("/overlap", async (req, res) => {
  try {
    const firstShift = req.query.shift1;
    const secondShift = req.query.shift2;
    if (!firstShift || !secondShift)
      return res.status(504).send("please include two valid shift_id");

    const data1 = await AppDataSource.query(
      `SELECT *, (shift_date+start_time)::TIMESTAMP as start_date_time,
(shift_date+end_time)::TIMESTAMP as end_date_time
FROM question_one_shifts
WHERE shift_id = $1;`,
      [firstShift]
    );

    const shift1: GetShiftOverlapResult = data1[0];

    const data2 = await AppDataSource.query(
      `SELECT *, (shift_date+start_time)::TIMESTAMP as start_date_time,
(shift_date+end_time)::TIMESTAMP as end_date_time
FROM question_one_shifts
WHERE shift_id = $1;`,
      [secondShift]
    );

    const shift2: GetShiftOverlapResult = data2[0];

    let maximumOverlapThreshold = 0;
    const overlapMinutes = dayjs(shift1.end_date_time).diff(
      shift2.start_date_time,
      "m",
      true
    );

    if (shift1.facility_id === shift2.facility_id) {
      maximumOverlapThreshold = 30;
    }

    res.send({
      maximumOverlapThreshold,
      overlapMinutes,
      exceedsOverlapThreshold: overlapMinutes > maximumOverlapThreshold,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as shiftRouter };
