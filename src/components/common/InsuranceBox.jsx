import { Link } from "react-router-dom";

const InsuranceBox = ({ service }) => {
  return (
    <div>
      <Link
        to={service?.path}
        className="flex flex-col items-center bg-[#191c3b] text-white rounded-lg p-3 cursor-pointer w-56"
      >
        {service.icon && <service.icon size={32} />}
        <p>{service?.title}</p>
      </Link>
    </div>
  );
};

export default InsuranceBox;
