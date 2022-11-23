import React from "react";
import styled from "styled-components";
import { IFacility } from "../facilities.interface";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

const FacilityCard: React.FC<{ facility: IFacility }> = ({ facility }) => {
  console.log(facility.start_time);
  return (
    <Wrapper className="facility-card">
      <p>{facility?.facility_name}</p>
      <p>{dayjs(facility?.shift_date).format("YYYY-MM-DD")}</p>
      <p>
        {dayjs(facility.start_date_time).format("LT")} -{" "}
        {dayjs(facility.end_date_time).format("LT")}
      </p>
    </Wrapper>
  );
};

export default FacilityCard;

const Wrapper = styled.button`
  text-align: center;
  padding: 1rem;
  p {
    margin-bottom: 0;
  }
`;
