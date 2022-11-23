import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { Q4Response, Q5Response } from "./facilities.interface";

interface JobProps {
  Q4Queries: Q4Response[] | null;
  Q5Queries: Q5Response[] | null;
  getQ4Queries: () => void;
  getQ5Queries: () => void;
}

const JobContext = createContext<JobProps>({} as JobProps);

export const useJobContext = () => useContext(JobContext);

export const JobContextProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [Q4Queries, setQ4Queries] = useState<Q4Response[] | null>(null);
  const [Q5Queries, setQ5Queries] = useState<Q5Response[] | null>(null);

  const getQ4Queries = async () => {
    setQ5Queries(null);
    try {
      const { data } = await axios.get(`http://localhost:8000/jobs/q4`);
      setQ4Queries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getQ5Queries = async () => {
    setQ4Queries(null);
    try {
      const { data } = await axios.get(`http://localhost:8000/jobs/q5`);
      setQ5Queries(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <JobContext.Provider
      value={{ Q4Queries, Q5Queries, getQ4Queries, getQ5Queries }}
    >
      {children}
    </JobContext.Provider>
  );
};
