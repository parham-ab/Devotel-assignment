import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PreLoader from "components/common/PreLoader";
import mainRoutes from "routes";

const App = () => {
  return (
    <Routes>
      {mainRoutes?.map((route) => (
        <Route
          key={route?.title}
          path={route?.path}
          element={
            <Suspense fallback={<PreLoader />}>
              <route.component />
            </Suspense>
          }
        />
      ))}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
