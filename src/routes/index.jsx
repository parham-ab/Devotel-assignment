import { lazy } from "react";
const HomeInsurance = lazy(() => import("pages/HomeInsurance"));
const CarInsurance = lazy(() => import("pages/CarInsurance"));
const HealthInsurance = lazy(() => import("pages/HealthInsurance"));

const mainRoutes = [
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
];

export default mainRoutes;
