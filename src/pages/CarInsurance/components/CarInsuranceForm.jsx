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
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });
  useEffect(() => {
    if (data) {
      const form = Array.isArray(data)
        ? data.find((item) => item?.formId === "car_insurance_application")
        : data?.formId === "car_insurance_application"
        ? data
        : null;
      if (form) {
        setFormFields(form.fields);
      } else {
        toast.error("Car insurance form not found in data");
      }
    }
  }, [data]);
  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/insurance/forms/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Submission failed");
      const result = await response.json();
      toast.success(result?.message || "Application submitted successfully");
      reset();
    } catch (error) {
      toast.error(error?.message || "Failed to submit application");
    }
  };
  const renderField = (field) => {
    if (
      field.visibility?.condition === "equals" &&
      watch(field.visibility.dependsOn) !== field.visibility.value
    ) {
      return null;
    }
    const validationRules = {
      required: field.required && `required`,
      ...(field.validation?.min && {
        min: {
          value: field.validation.min,
          message: `Min ${field.validation.min}`,
        },
      }),
      ...(field.validation?.max && {
        max: {
          value: field.validation.max,
          message: `Max ${field.validation.max}`,
        },
      }),
    };
    const options = field.options || [];

    return (
      <div key={field.id} className="flex flex-col space-y-2">
        <label className="font-semibold text-gray-700">{field.label}</label>
        {field.type === "text" && (
          <input
            type="text"
            {...register(field.id, validationRules)}
            className={"inputStyles"}
          />
        )}
        {field.type === "number" && (
          <input
            type="number"
            {...register(field.id, validationRules)}
            className={"inputStyles"}
          />
        )}
        {field.type === "radio" && (
          <div className="flex space-x-4">
            {options.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option}
                  {...register(field.id, validationRules)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        )}
        {field.type === "select" && (
          <select
            {...register(field.id, validationRules)}
            className={"inputStyles"}
          >
            <option value="">Select {field.label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
  if (loading) return <PreLoader />;
  if (error)
    return <ErrorPage errorMessage={error.message || "Failed to load form"} />;
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg my-14">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Car Insurance Application
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {formFields.map(renderField)}
        <CustomButton
          disabled={isSubmitting}
          type="submit"
          className="w-full text-white p-2 rounded-md transition-colors duration-200"
          style={{
            background: "linear-gradient(45deg, #1D99FF 0%, #7938DC 100%)",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </CustomButton>
      </form>
    </div>
  );
};

export default CarInsuranceForm;
