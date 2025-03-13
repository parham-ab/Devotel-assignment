// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import PreLoader from "components/common/PreLoader";
// import ErrorPage from "components/ErrorPage";
// import useFetch from "hooks/useFetch";
// import CustomButton from "components/common/CustomButton";

// const HomeInsurance = () => {
//   const { data, loading, error } = useFetch("api/insurance/forms");
//   const [formFields, setFormFields] = useState([]);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     if (data) {
//       const form = data.find(
//         (item) => item?.formId === "home_insurance_application"
//       );
//       if (form) setFormFields(form.fields);
//     }
//   }, [data]);

//   const onSubmit = (formData) => {
//     console.log("Submitted Data:", formData);
//   };

//   if (loading) return <PreLoader />;
//   if (error) return <ErrorPage />;

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-14">
//       <h2 className="text-xl font-bold mb-4">Home Insurance Application</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {formFields.map((field) => {
//           const fieldValue = watch(field.id);

//           if (field.visibility) {
//             const { dependsOn, condition, value } = field.visibility;
//             if (condition === "equals" && watch(dependsOn) !== value)
//               return null;
//           }

//           return (
//             <div key={field.id} className="flex flex-col space-y-2">
//               <label className="font-semibold">{field.label}</label>

//               {/* Radio Button */}
//               {field.type === "radio" &&
//                 field.options.map((option) => (
//                   <label key={option} className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       value={option}
//                       {...register(field.id, { required: field.required })}
//                       className="w-4 h-4"
//                     />
//                     <span>{option}</span>
//                   </label>
//                 ))}
//               {errors[field.id] && (
//                 <p className="text-red-500 text-sm">This field is required</p>
//               )}

//               {/* Select Dropdown */}
//               {field.type === "select" && (
//                 <select
//                   {...register(field.id, { required: field.required })}
//                   className="border border-gray-300 rounded-md p-2"
//                 >
//                   <option value="">Select an option</option>
//                   {field.options.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               )}
//               {errors[field.id] && (
//                 <p className="text-red-500 text-sm">This field is required</p>
//               )}

//               {/* Number Input */}
//               {field.type === "number" && (
//                 <input
//                   type="number"
//                   min={field.validation?.min}
//                   max={field.validation?.max}
//                   {...register(field.id, {
//                     required: field.required,
//                     min: field.validation?.min,
//                     max: field.validation?.max,
//                   })}
//                   className="border border-gray-300 rounded-md p-2"
//                 />
//               )}
//               {errors[field.id] && (
//                 <p className="text-red-500 text-sm">Invalid number</p>
//               )}

//               {/* Checkbox */}
//               {field.type === "checkbox" &&
//                 field.options.map((option) => (
//                   <label key={option} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       value={option}
//                       {...register(field.id)}
//                       className="w-4 h-4"
//                     />
//                     <span>{option}</span>
//                   </label>
//                 ))}

//               {/* Text Input */}
//               {field.type === "text" && (
//                 <input
//                   type="text"
//                   {...register(field.id, {
//                     required: field.required,
//                     pattern: field.validation?.pattern
//                       ? new RegExp(field.validation.pattern)
//                       : undefined,
//                   })}
//                   className="border border-gray-300 rounded-md p-2"
//                 />
//               )}
//               {errors[field.id] && (
//                 <p className="text-red-500 text-sm">Invalid input</p>
//               )}

//               {/* Grouped Fields */}
//               {field.type === "group" &&
//                 field.fields.map((subField) => (
//                   <div key={subField.id} className="flex flex-col space-y-2">
//                     <label className="font-semibold">{subField.label}</label>
//                     <input
//                       type={subField.type}
//                       {...register(subField.id, {
//                         required: subField.required,
//                       })}
//                       className="border border-gray-300 rounded-md p-2"
//                     />
//                     {errors[subField.id] && (
//                       <p className="text-red-500 text-sm">
//                         This field is required
//                       </p>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           );
//         })}
//         <CustomButton
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded-md cursor-pointer"
//           style={{
//             background:
//               "linear-gradient(45deg, rgb(29, 153, 255) 0%, rgb(121, 56, 220) 100%)",
//           }}
//         >
//           Submit
//         </CustomButton>
//       </form>
//     </div>
//   );
// };

// export default HomeInsurance;
import InsuranceBox from "components/common/InsuranceBox";
import homeInsuranceOptions from "./constants/homeInsuranceOptions";

const HomeInsurance = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col items-center justify-center gap-4 h-screen">
        {homeInsuranceOptions?.map((service) => (
          <InsuranceBox key={service?.id} service={service} />
        ))}
      </div>
    </>
  );
};

export default HomeInsurance;
