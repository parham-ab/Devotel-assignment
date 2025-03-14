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
  const [myStates, setMyStates] = useState([]);
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
        const updatedFields = form.fields.map((field) => {
          if (field.id === "home_address") {
            return {
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
            };
          }
          return field;
        });
        setFormFields(updatedFields);
      }
    }
  }, [data]);
  useEffect(() => {
    const fetchStates = async () => {
      if (!countryValue) {
        setDynamicOptions((prev) => ({
          ...prev,
          "home_address.state": [],
        }));
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/api/getStates?country=${countryValue}`,
          { method: "GET" }
        );
        if (!response.ok) throw new Error("Failed to fetch states");
        const states = await response.json();
        setMyStates(states?.states);
        const statesArray = Array.isArray(states) ? states : [];
        setDynamicOptions((prev) => ({
          ...prev,
          "home_address.state": statesArray,
        }));
      } catch (err) {
        console.error("Error fetching states:", err);
        setDynamicOptions((prev) => ({
          ...prev,
          "home_address.state": [],
        }));
      }
    };

    fetchStates();
  }, [countryValue, BASE_URL]);
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
  if (error) return <ErrorPage />;

  const renderField = (field) => {
    const fieldId = field.id;
    const fieldValue = watch(fieldId);
    let isVisible = true;
    if (field.visibility) {
      const { dependsOn, condition, value } = field.visibility;
      isVisible = condition === "equals" && watch(dependsOn) === value;
      if (!isVisible) return null;
    }

    const validationRules = {
      required: isVisible && field.required ? "required" : false,
      min: field.validation?.min && {
        value: field.validation.min,
        message: `${field.label} must be at least ${field.validation.min}`,
      },
      max: field.validation?.max && {
        value: field.validation.max,
        message: `${field.label} must not exceed ${field.validation.max}`,
      },
      pattern: field.validation?.pattern && {
        value: new RegExp(field.validation.pattern),
        message: `${field.label} format is invalid`,
      },
    };

    const options = field.dynamicOptions
      ? dynamicOptions[fieldId] || []
      : Array.isArray(field.options)
      ? field.options
      : [];

    return (
      <div key={fieldId} className="flex flex-col space-y-2">
        <label className="font-semibold">{field.label}</label>
        {field.type === "radio" &&
          field.options.map((option) => (
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
        {field.type === "select" && field?.id !== "home_address.state" && (
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
        {field.type === "select" && field?.id === "home_address.state" && (
          <select
            {...register(fieldId, validationRules)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Select an option</option>
            {myStates.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        {field.type === "number" && (
          <input
            type="number"
            {...register(fieldId, validationRules)}
            className="border border-gray-300 rounded-md p-2"
          />
        )}
        {field.type === "checkbox" &&
          field.options.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                {...register(fieldId, validationRules)}
                className="w-4 h-4"
              />
              <span>{option}</span>
            </label>
          ))}
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
              renderField({
                ...subField,
                id: `${fieldId}.${subField.id}`, // Correctly nest field IDs
              })
            )}
          </div>
        )}

        {errors[fieldId] && (
          <p className="text-red-500 text-sm">{errors[fieldId].message}</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-14">
      <h2 className="text-xl font-bold mb-4">Home Insurance Application</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {isSubmitting ? "Submitting..." : "Submit"}
        </CustomButton>
      </form>
    </div>
  );
};

export default HomeInsuranceForm;
