import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { IFacility } from "./facilities.interface";

interface FacilityProps {
  facilities: IFacility[];
  getFacilities: () => Promise<void>;
}

const FacilityContext = createContext<FacilityProps>({} as FacilityProps);

export const useFacilityContext = () => useContext(FacilityContext);

export const FacilityContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [facilities, setFacilities] = useState<IFacility[]>([]);

  const getFacilities = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/facilities`);
      setFacilities(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FacilityContext.Provider value={{ facilities, getFacilities }}>
      {children}
    </FacilityContext.Provider>
  );
};
