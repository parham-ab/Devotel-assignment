import CustomButton from "components/common/CustomButton";
import PreLoader from "components/common/PreLoader";
import ErrorPage from "components/ErrorPage";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const HomeInsuranceForm = () => {
  const { data, loading, error } = useFetch("api/insurance/forms");
  const [formFields, setFormFields] = useState([]);
  const [dynamicOptions, setDynamicOptions] = useState({});
  const BASE_URL = import.meta.env.VITE_API_URL;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });
  const countryValue = watch("home_address.country");
  useEffect(() => {
    if (data) {
      const form = data.find(
        (item) => item?.formId === "home_insurance_application"
      );
      if (form) {
        setFormFields(
          form.fields.map((field) =>
            field.id === "home_address"
              ? {
                  ...field,
                  fields: [
                    {
                      id: "country",
                      label: "Country",
                      type: "select",
                      options: ["USA", "Canada", "Germany"],
                      required: true,
                    },
                    ...field.fields,
                  ],
                }
              : field
          )
        );
      }
    }
  }, [data]);
  useEffect(() => {
    const fetchStates = async () => {
      if (!countryValue) {
        setDynamicOptions((prev) => ({ ...prev, "home_address.state": [] }));
        return;
      }
      try {
        const response = await fetch(
          `${BASE_URL}/api/getStates?country=${countryValue}`
        );
        if (!response.ok) throw new Error("Failed to fetch states");
        const states = await response.json();
        setDynamicOptions((prev) => ({
          ...prev,
          "home_address.state": Array.isArray(states)
            ? states
            : states?.states || [],
        }));
      } catch (err) {
        toast.error("Could not fetch states!");
        setDynamicOptions((prev) => ({ ...prev, "home_address.state": [] }));
      }
    };
    fetchStates();
  }, [countryValue, BASE_URL]);
  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/insurance/forms/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit");
      const result = await response.json();
      toast.success(result?.message || "Submission successful");
    } catch (error) {
      toast.error(error?.message || "Submission failed");
    }
  };
  const renderField = (field) => {
    const fieldId = field.id;
    if (
      field.visibility?.condition === "equals" &&
      watch(field.visibility.dependsOn) !== field.visibility.value
    ) {
      return null;
    }
    const validationRules = {
      required: field.required && "required",
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
      ...(field.validation?.pattern && {
        pattern: {
          value: new RegExp(field.validation.pattern),
          message: "Invalid format",
        },
      }),
    };
    const options = field.dynamicOptions
      ? dynamicOptions[fieldId] || []
      : field.options || [];
    return (
      <div key={fieldId} className="flex flex-col space-y-2">
        <label className="font-semibold">{field.label}</label>

        {field.type === "select" && (
          <select
            {...register(fieldId, validationRules)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        {field.type === "radio" &&
          options.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                value={option}
                {...register(fieldId, validationRules)}
                className="w-4 h-4"
              />
              <span>{option}</span>
            </label>
          ))}
        {field.type === "number" && (
          <input
            type="number"
            {...register(fieldId, validationRules)}
            className="border border-gray-300 rounded-md p-2"
          />
        )}
        {field.type === "text" && (
          <input
            type="text"
            {...register(fieldId, validationRules)}
            className="border border-gray-300 rounded-md p-2"
          />
        )}
        {field.type === "group" && (
          <div className="space-y-4 pl-4 border-l-2 border-gray-200">
            {field.fields.map((subField) =>
              renderField({ ...subField, id: `${fieldId}.${subField.id}` })
            )}
          </div>
        )}
        {errors[fieldId] && (
          <p className="text-red-500 text-sm">{errors[fieldId].message}</p>
        )}
      </div>
    );
  };
  if (loading) return <PreLoader />;
  if (error) return <ErrorPage />;
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-14">
      <h2 className="text-xl font-bold mb-4">Home Insurance Application</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map(renderField)}
        <CustomButton
          disabled={isSubmitting}
          type="submit"
          className="w-full text-white p-2 rounded-md"
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
export default HomeInsuranceForm;
