import InsuranceBox from "components/common/InsuranceBox";
import homeInsuranceOptions from "./constants/homeInsuranceOptions";

const HomeInsurance = () => {
  return (
    <div className="flex md:flex-row flex-col items-center justify-center gap-4 h-screen">
      {homeInsuranceOptions?.map((service) => (
        <InsuranceBox key={service?.id} service={service} />
      ))}
    </div>
  );
};

export default HomeInsurance;
