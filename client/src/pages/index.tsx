import { useEffect } from "react";
import styled from "styled-components";
import FacilityCard from "../components/FacilityCard";
import { useFacilityContext } from "../facilities.context";

const HomePage = () => {
  const {
    facilities,
    getFacilities,
    selectedShifts,
    compareShifts,
    overlapResult,
    clearSelection,
  } = useFacilityContext();

  useEffect(() => {
    getFacilities();
  }, []);
  return (
    <Wrapper>
      <div className="top">
        <div className="left">
          <ul>
            <li>
              Overlap Minutes:{" "}
              <span className="fw-bold ms-2">
                {overlapResult?.overlapMinutes}
              </span>{" "}
            </li>
            <li>
              Max Overlap Threshold:
              <span className="fw-bold ms-2">
                {overlapResult?.maximumOverlapThreshold}
              </span>
            </li>
            <li>
              Exceeds Overlap threshold:
              <span className="fw-bold ms-2">
                {overlapResult?.exceedsOverlapThreshold}
              </span>
            </li>
          </ul>
        </div>
        <div className="right">
          <button
            className="btn rounded-0 btn-secondary"
            disabled={selectedShifts.length < 2}
            onClick={() => {
              if (selectedShifts.length > 1) {
                compareShifts();
              }
            }}
          >
            Compare Shifts
          </button>
          <button
            className="btn rounded-0 btn-danger ms-3"
            disabled={selectedShifts.length === 0}
            onClick={clearSelection}
          >
            Clear Shifts
          </button>
        </div>
      </div>

      <div className="facility-list">
        {facilities.map((facility) => (
          <FacilityCard facility={facility} key={facility.shift_id} />
        ))}
      </div>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  ul {
    list-style: none;
    padding: 0;
  }
  width: 100%;
  max-width: 80%;
  margin: auto;
  background-color: #f2ecec;
  padding: 1rem;
  margin-top: 2rem;

  .top {
    display: flex;
    align-items: center;
    border: 3px solid gray;
    padding: 1rem;
    .left {
      flex: 1;
    }
  }

  .facility-list {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
`;
