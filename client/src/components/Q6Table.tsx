import React from "react";
import { Q6Response } from "../facilities.interface";

const Q6Table: React.FC<{ data: Q6Response[] | null }> = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>nurse_name</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row) => (
          <tr key={row.nurse_name}>
            <td>{row.nurse_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Q6Table;
