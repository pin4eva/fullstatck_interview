export class Shift {
  shift_id: number;
  facility_id: number;
  shift_date: Date;
  start_time: Date;
  end_time: Date;
}

export class Facility {
  facility_id: number;
  facility_name: string;
}

export class Job {
  job_id: number;
  facility_id: number;
  nurse_type_needed: string;
  total_number_nurses_needed: number;
}

export class Nurse {
  nurse_id: number;
  nurse_name: string;
  nurse_type: string;
}

export class NURSE_HIRED_JOBS {
  job_id: number;
  nurse_id: number;
}

export class GetShiftOverlapResult {
  shift_id: number;
  facility_id: number;
  shift_date: Date;
  start_time: Date;
  end_time: Date;
  start_date_time: Date;
  end_date_time: Date;
}
