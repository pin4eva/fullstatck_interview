export interface IFacility {
  shift_id: number;
  facility_id: number;
  facility_name: string;
  shift_date: Date;
  start_time: string;
  end_time: string;
  start_date_time: Date;
  end_date_time: Date;
}

export interface ShiftOverlapResult {
  maximumOverlapThreshold: number;
  overlapMinutes: number;
  exceedsOverlapThreshold: string;
}

export interface Q4Response {
  job_id: number;
  facility_id: number;
  total_number_nurses_needed: number;
  nurses_hired: number;
  nurses_left: number;
}

export interface Q5Response {
  nurse_id: number;
  nurse_name: string;
  nurse_type: string;
  can_apply_for: string;
}

export interface Q6Response {
  nurse_name: string;
}
