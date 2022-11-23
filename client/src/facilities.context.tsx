import axios from "axios";
import React, { createContext, useCallback, useContext, useState } from "react";
import { IFacility, ShiftOverlapResult } from "./facilities.interface";

interface FacilityProps {
  facilities: IFacility[];
  getFacilities: () => Promise<void>;
  overlapResult: ShiftOverlapResult | null;
  compareShifts: () => Promise<void>;
  selectedShifts: number[];
  setSelectedShifts: (n: number) => void;
  clearSelection: () => void;
}

const FacilityContext = createContext<FacilityProps>({} as FacilityProps);

export const useFacilityContext = () => useContext(FacilityContext);

export const FacilityContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [overlapResult, setOverlapResult] = useState<ShiftOverlapResult | null>(
    null
  );
  const [selectedShifts, updateSelectedShifts] = useState<number[]>([]);

  const getFacilities = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/facilities`);
      setFacilities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const compareShifts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/facilities/overlap?shift1=${selectedShifts[0]}&shift2=${selectedShifts[1]}`
      );
      setOverlapResult({
        ...data,
        exceedsOverlapThreshold: data.exceedsOverlapThreshold
          ? "True"
          : "False",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setSelectedShifts = useCallback(
    async (n: number) => {
      setOverlapResult(null);
      if (selectedShifts.length > 1) {
        updateSelectedShifts([n]);
      } else {
        updateSelectedShifts([...selectedShifts, n]);
      }
    },
    [selectedShifts]
  );

  const clearSelection = () => {
    setOverlapResult(null);
    updateSelectedShifts([]);
  };
  return (
    <FacilityContext.Provider
      value={{
        facilities,
        getFacilities,
        overlapResult,
        compareShifts,
        selectedShifts,
        setSelectedShifts,
        clearSelection,
      }}
    >
      {children}
    </FacilityContext.Provider>
  );
};
