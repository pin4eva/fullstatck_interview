import { useEffect } from "react";
import styled from "styled-components";
import FacilityCard from "../components/FacilityCard";
import { useFacilityContext } from "../facilities.context";

const HomePage = () => {
  const { facilities, getFacilities } = useFacilityContext();

  useEffect(() => {
    getFacilities();
  }, []);
  return (
    <Wrapper>
      <div className="top">
        <div className="left">
          <ul>
            <li>Overlap Minutes: 30</li>
            <li>Max Overlap Threshold: 0</li>
            <li>Exceeds Overlap threshold: True</li>
          </ul>
        </div>
        <div className="right">
          <button className="btn rounded-0 btn-secondary">Submit</button>
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
