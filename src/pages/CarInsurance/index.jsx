import carInsuranceOptions from "./constants/CarInsuranceOptions";
import InsuranceBox from "components/common/InsuranceBox";

const CarInsurance = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col items-center justify-center gap-4 h-screen">
        {carInsuranceOptions?.map((service) => (
          <InsuranceBox key={service?.id} service={service} />
        ))}
      </div>
    </>
  );
};

export default CarInsurance;
