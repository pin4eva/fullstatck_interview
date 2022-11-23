import "bootstrap/dist/css/bootstrap.min.css";
import { FacilityContextProvider } from "./facilities.context";
import { JobContextProvider } from "./jobs.context";
import { AppRoutes } from "./router";
// import { ShiftContextProvider, useShiftContext } from "./shift.context";

const App = () => {
  return (
    <FacilityContextProvider>
      <JobContextProvider>
        <AppRoutes />
      </JobContextProvider>
    </FacilityContextProvider>
  );
};

export default App;
