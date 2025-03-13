import { FaHome, FaCar } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

const insuranceServices = [
  {
    id: 0,
    title: "Home Insurance",
    icon: FaHome,
    path: "/HomeInsurance",
  },
  {
    id: 1,
    title: "Health Insurance",
    icon: MdHealthAndSafety,
    path: "/HealthInsurance",
  },
  {
    id: 2,
    title: "Car Insurance",
    icon: FaCar,
    path: "/CarInsurance",
  },
];

export default insuranceServices;
