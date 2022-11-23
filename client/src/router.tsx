import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import { FacilityContextProvider } from "./facilities.context";

export const AppRoutes = () => {
  return (
    <FacilityContextProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </FacilityContextProvider>
  );
};
