import { lazy } from "react";
const HomeInsurance = lazy(() => import("pages/HomeInsurance"));
const CarInsurance = lazy(() => import("pages/CarInsurance"));
const HealthInsurance = lazy(() => import("pages/HealthInsurance"));
const HomePage = lazy(() => import("pages/HomePage"));
const HomeInsuranceForm = lazy(() =>
  import("pages/HomeInsurance/components/HomeInsuranceForm")
);
const HomeInsuranceLists = lazy(() =>
  import("pages/HomeInsurance/components/HomeInsuranceLists")
);

const mainRoutes = [
  {
    path: "/",
    title: "HomePage",
    component: HomePage,
  },
  {
    path: "/HomeInsurance",
    title: "HomeInsurance",
    component: HomeInsurance,
  },
  {
    path: "/CarInsurance",
    title: "CarInsurance",
    component: CarInsurance,
  },
  {
    path: "/HealthInsurance",
    title: "HealthInsurance",
    component: HealthInsurance,
  },
  {
    path: "/HomeInsuranceForm",
    title: "HomeInsuranceForm",
    component: HomeInsuranceForm,
  },
  {
    path: "/HomeInsuranceList",
    title: "HomeInsuranceList",
    component: HomeInsuranceLists,
  },
];

export default mainRoutes;
