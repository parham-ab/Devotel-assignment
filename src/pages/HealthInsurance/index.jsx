import InsuranceBox from "components/common/InsuranceBox";
import healthInsuranceOptions from "./constants/healthInsuranceOptions";

const HealthInsurance = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col items-center justify-center gap-4 h-screen">
        {healthInsuranceOptions?.map((service) => (
          <InsuranceBox key={service?.id} service={service} />
        ))}
      </div>
    </>
  );
};

export default HealthInsurance;
