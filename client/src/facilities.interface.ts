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
