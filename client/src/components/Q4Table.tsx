import React from "react";
import { Q4Response } from "../facilities.interface";

const Q4Table: React.FC<{ data: Q4Response[] | null }> = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>job_id</th>
          <th>facility_id</th>
          <th>total_number_nurses_needed</th>
          <th>nurses_hired</th>
          <th>nurses_left</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row, i) => (
          <tr key={i}>
            <td>{row?.job_id}</td>
            <td>{row?.facility_id}</td>
            <td>{row?.total_number_nurses_needed}</td>
            <td>{row?.nurses_hired}</td>
            <td>{row?.nurses_left}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Q4Table;
