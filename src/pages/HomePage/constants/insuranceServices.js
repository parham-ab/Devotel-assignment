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
    icon: FaCar,
    path: "/HealthInsurance",
  },
  {
    id: 2,
    title: "Car Insurance",
    icon: MdHealthAndSafety,
    path: "/CarInsurance",
  },
];

export default insuranceServices;
