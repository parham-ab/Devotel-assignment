// import CustomButton from "components/common/CustomButton";
// import PreLoader from "components/common/PreLoader";
// import ErrorPage from "components/ErrorPage";
// import useFetch from "hooks/useFetch";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// const HomeInsuranceForm = () => {
//   const { data, loading, error } = useFetch("api/insurance/forms");
//   const [formFields, setFormFields] = useState([]);
//   const [dynamicOptions, setDynamicOptions] = useState({}); // Store dynamic options
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({ mode: "onChange" });

//   useEffect(() => {
//     if (data) {
//       const form = data.find(
//         (item) => item?.formId === "home_insurance_application"
//       );
//       if (form) {
//         // Add a country field if it’s missing (temporary fix for demo)
//         const hasCountry = form.fields.some((f) => f.id === "country");
//         if (!hasCountry) {
//           form.fields.unshift({
//             id: "country",
//             label: "Country",
//             type: "select",
//             options: ["USA", "Canada", "Germany"],
//             required: true,
//           });
//         }
//         setFormFields(form.fields);
//       }
//     }
//   }, [data]);

//   // Fetch dynamic options when dependent field changes
//   useEffect(() => {
//     const fetchDynamicOptions = async (field) => {
//       const { dependsOn, endpoint, method } = field.dynamicOptions;
//       const dependentValue = watch(dependsOn); // e.g., "USA"
//       if (!dependentValue) return; // Skip if no value
//       const BASE_URL = import.meta.env.VITE_API_URL;
//       try {
//         const response = await fetch(
//           `${BASE_URL}${endpoint}?${dependsOn}=${dependentValue}`,
//           { method: method || "GET" }
//         );
//         if (!response.ok) throw new Error("Failed to fetch options");
//         const options = await response.json(); // Expecting ["California", "Texas", ...]
//         setDynamicOptions((prev) => ({
//           ...prev,
//           [field.id]: options,
//         }));
//       } catch (err) {
//         console.error(`Error fetching options for ${field.id}:`, err);
//       }
//     };

//     formFields.forEach((field) => {
//       if (field.dynamicOptions) {
//         fetchDynamicOptions(field);
//       }
//       if (field.type === "group") {
//         field.fields.forEach((subField) => {
//           if (subField.dynamicOptions) {
//             fetchDynamicOptions(subField);
//           }
//         });
//       }
//     });
//   }, [formFields, watch]); // Re-run when formFields or watched values change

//   const onSubmit = (formData) => {
//     console.log("Submitted Data:", formData);
//     // Here you’d typically send formData to an API to save it
//   };

//   if (loading) return <PreLoader />;
//   if (error) return <ErrorPage />;

//   const renderField = (field) => {
//     const fieldValue = watch(field.id);

//     // Visibility logic
//     let isVisible = true;
//     if (field.visibility) {
//       const { dependsOn, condition, value } = field.visibility;
//       isVisible = condition === "equals" && watch(dependsOn) === value;
//       if (!isVisible) return null;
//     }

//     // Validation rules
//     const validationRules = {
//       required:
//         isVisible && field.required ? `${field.label} is required` : false,
//       min: field.validation?.min
//         ? {
//             value: field.validation.min,
//             message: `${field.label} must be at least ${field.validation.min}`,
//           }
//         : undefined,
//       max: field.validation?.max
//         ? {
//             value: field.validation.max,
//             message: `${field.label} must not exceed ${field.validation.max}`,
//           }
//         : undefined,
//       pattern: field.validation?.pattern
//         ? {
//             value: new RegExp(field.validation.pattern),
//             message: `${field.label} format is invalid`,
//           }
//         : undefined,
//     };

//     // Options for select: static or dynamic
//     const options = field.dynamicOptions
//       ? dynamicOptions[field.id] || []
//       : field.options || [];

//     return (
//       <div key={field.id} className="flex flex-col space-y-2">
//         <label className="font-semibold">{field.label}</label>

//         {/* Radio */}
//         {field.type === "radio" &&
//           field.options.map((option) => (
//             <label key={option} className="flex items-center space-x-2">
//               <input
//                 type="radio"
//                 value={option}
//                 {...register(field.id, validationRules)}
//                 className="w-4 h-4"
//               />
//               <span>{option}</span>
//             </label>
//           ))}

//         {/* Select */}
//         {field.type === "select" && (
//           <select
//             {...register(field.id, validationRules)}
//             className="border border-gray-300 rounded-md p-2"
//           >
//             <option value="">Select an option</option>
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         )}

//         {/* Number */}
//         {field.type === "number" && (
//           <input
//             type="number"
//             {...register(field.id, validationRules)}
//             className="border border-gray-300 rounded-md p-2"
//           />
//         )}

//         {/* Checkbox */}
//         {field.type === "checkbox" &&
//           field.options.map((option) => (
//             <label key={option} className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 value={option}
//                 {...register(field.id, validationRules)}
//                 className="w-4 h-4"
//               />
//               <span>{option}</span>
//             </label>
//           ))}

//         {/* Text */}
//         {field.type === "text" && (
//           <input
//             type="text"
//             {...register(field.id, validationRules)}
//             className="border border-gray-300 rounded-md p-2"
//           />
//         )}

//         {/* Group */}
//         {field.type === "group" && (
//           <div className="space-y-4 pl-4 border-l-2 border-gray-200">
//             {field.fields.map((subField) => renderField(subField))}
//           </div>
//         )}

//         {/* Error */}
//         {errors[field.id] && (
//           <p className="text-red-500 text-sm">{errors[field.id].message}</p>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-14">
//       <h2 className="text-xl font-bold mb-4">Home Insurance Application</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {formFields.map((field) => renderField(field))}
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

// export default HomeInsuranceForm;


import React from 'react';

const CarInsuranceForm = () => {
  return (
    <div>
      
    </div>
  );
};

export default CarInsuranceForm;