import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { Q4Response, Q5Response, Q6Response } from "./facilities.interface";

interface JobProps {
  Q4Queries: Q4Response[] | null;
  Q5Queries: Q5Response[] | null;
  Q6Queries: Q6Response[] | null;
  getQ4Queries: () => void;
  getQ5Queries: () => void;
  getQ6Queries: () => void;
}

const JobContext = createContext<JobProps>({} as JobProps);

export const useJobContext = () => useContext(JobContext);

export const JobContextProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [Q4Queries, setQ4Queries] = useState<Q4Response[] | null>(null);
  const [Q5Queries, setQ5Queries] = useState<Q5Response[] | null>(null);
  const [Q6Queries, setQ6Queries] = useState<Q6Response[] | null>(null);

  const getQ4Queries = async () => {
    setQ5Queries(null);
    setQ6Queries(null);
    try {
      const { data } = await axios.get(`http://localhost:8000/jobs/q4`);
      console.table(data);
      setQ4Queries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getQ5Queries = async () => {
    setQ4Queries(null);
    setQ6Queries(null);
    try {
      const { data } = await axios.get(`http://localhost:8000/jobs/q5`);
      console.table(data);
      setQ5Queries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getQ6Queries = async () => {
    setQ4Queries(null);
    setQ5Queries(null);
    try {
      const { data } = await axios.get(
        `http://localhost:8000/jobs/q6?nurse_id=1001`
      );
      console.table(data);
      setQ6Queries(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <JobContext.Provider
      value={{
        Q4Queries,
        Q5Queries,
        Q6Queries,
        getQ4Queries,
        getQ5Queries,
        getQ6Queries,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
