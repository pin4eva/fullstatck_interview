import React from "react";
import { Q5Response } from "../facilities.interface";

const Q5Table: React.FC<{ data: Q5Response[] | null }> = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>nurse_id</th>
          <th>nurse_name</th>
          <th>nurse_type</th>
          <th>can_apply_for</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row) => (
          <tr key={row.nurse_id}>
            <td>{row?.nurse_id}</td>
            <td>{row?.nurse_name}</td>
            <td>{row?.nurse_type}</td>
            <td>{row?.can_apply_for}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Q5Table;
