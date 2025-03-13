import InsuranceBox from "components/common/InsuranceBox";
import insuranceServices from "./constants/insuranceServices";
const HomePage = () => {
  return (
    <div className="flex md:flex-row flex-col items-center justify-center h-screen gap-4">
      {insuranceServices?.map((service) => (
        <InsuranceBox key={service?.id} service={service} />
      ))}
    </div>
  );
};

export default HomePage;
