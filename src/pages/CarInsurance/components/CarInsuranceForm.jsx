import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PreLoader from "components/common/PreLoader";
import ErrorPage from "components/ErrorPage";
import useFetch from "hooks/useFetch";
import CustomButton from "components/common/CustomButton";
import toast from "react-hot-toast";

const CarInsuranceForm = () => {
  const { data, loading, error } = useFetch("api/insurance/forms");
  const [formFields, setFormFields] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (data) {
      const form = Array.isArray(data)
        ? data.find((item) => item?.formId === "car_insurance_application")
        : data.formId === "car_insurance_application"
        ? data
        : null;
      if (form) {
        setFormFields(form.fields);
      }
    }
  }, [data]);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/insurance/forms/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit the application");
      const result = await response.json();
      toast.success(result?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  if (loading) return <PreLoader />;
  if (error)
    return (
      <ErrorPage
        errorMessage={error.message || "Failed to load the car insurance form."}
      />
    );

  const renderField = (field) => {
    const fieldValue = watch(field.id);

    let isVisible = true;
    if (field.visibility) {
      const { dependsOn, condition, value } = field.visibility;
      isVisible = condition === "equals" && watch(dependsOn) === value;
      if (!isVisible) return null;
    }

    const validationRules = {
      required: isVisible && field.required ? `required` : false,
      min: field.validation?.min
        ? {
            value: field.validation.min,
            message: `${field.label} must be at least ${field.validation.min}`,
          }
        : undefined,
      max: field.validation?.max
        ? {
            value: field.validation.max,
            message: `${field.label} must not exceed ${field.validation.max}`,
          }
        : undefined,
    };

    const options = field.options || [];

    return (
      <div key={field.id} className="flex flex-col space-y-2">
        <label className="font-semibold text-gray-700">{field.label}</label>

        {field.type === "radio" && (
          <div className="flex space-x-4">
            {options.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option}
                  {...register(field.id, validationRules)}
                  className="w-4 h-4"
                />
                <span className="text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        )}

        {field.type === "select" && (
          <select
            {...register(field.id, validationRules)}
            className="border border-gray-300 rounded-md p-2 focus:border-transparent"
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {field.type === "text" && (
          <input
            type="text"
            {...register(field.id, validationRules)}
            className="border border-gray-300 rounded-md p-2 focus:border-transparent"
          />
        )}

        {field.type === "number" && (
          <input
            type="number"
            {...register(field.id, validationRules)}
            className="border border-gray-300 rounded-md p-2 focus:border-transparent"
          />
        )}

        {field.type === "group" && (
          <div className="space-y-4 pl-4 border-l-2 border-gray-200">
            {field.fields.map((subField) => renderField(subField))}
          </div>
        )}

        {errors[field.id] && (
          <p className="text-red-500 text-sm">{errors[field.id].message}</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg my-14">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Car Insurance Application
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {formFields.map((field) => renderField(field))}
        <CustomButton
          disabled={isSubmitting}
          type="submit"
          className="w-full text-white p-2 rounded-md cursor-pointer"
          style={{
            background:
              "linear-gradient(45deg, rgb(29, 153, 255) 0%, rgb(121, 56, 220) 100%)",
          }}
        >
          {isSubmitting ? "submitting..." : "Submit"}
        </CustomButton>
      </form>
    </div>
  );
};

export default CarInsuranceForm;
