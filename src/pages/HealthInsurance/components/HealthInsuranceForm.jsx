import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PreLoader from "components/common/PreLoader";
import ErrorPage from "components/ErrorPage";
import useFetch from "hooks/useFetch";
import CustomButton from "components/common/CustomButton";
import toast from "react-hot-toast";

const HealthInsuranceForm = () => {
  const { data, loading, error } = useFetch("api/insurance/forms");
  const [formFields, setFormFields] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const countryValue = watch("country");

  useEffect(() => {
    if (data) {
      const form = Array.isArray(data)
        ? data.find((item) => item?.formId === "health_insurance_application")
        : data.formId === "health_insurance_application"
        ? data
        : null;
      if (form) {
        setFormFields(form.fields);
      } else {
        console.log("No matching form found in data:", data);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!countryValue) {
      setStateOptions([]);
      return;
    }

    const fetchStates = async () => {
      setIsLoadingStates(true);
      try {
        const response = await fetch(
          `${BASE_URL}/api/getStates?country=${countryValue}`,
          { method: "GET" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const statesData = await response.json();

        let statesArray = [];
        if (Array.isArray(statesData)) {
          statesArray = statesData;
        } else if (statesData && typeof statesData === "object") {
          statesArray =
            statesData.states ||
            statesData.data ||
            Object.values(statesData) ||
            [];
        }
        setStateOptions(statesArray);
      } catch (err) {
        setStateOptions([]);
      } finally {
        setIsLoadingStates(false);
      }
    };

    fetchStates();
  }, [countryValue]);

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
    };

    const options =
      field.id === "state"
        ? stateOptions
        : Array.isArray(field.options)
        ? field.options
        : [];

    return (
      <div key={field.id} className="flex flex-col space-y-2">
        <label className="font-semibold text-gray-700">{field.label}</label>
        {field.type === "text" && (
          <input
            type="text"
            {...register(field.id, validationRules)}
            className="border border-gray-300 rounded-md p-2 focus:border-transparent"
          />
        )}

        {field.type === "date" && (
          <input
            type="date"
            {...register(field.id, validationRules)}
            className="border border-gray-300 rounded-md p-2 focus:border-transparent"
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
                  className="w-4 h-4"
                />
                <span className="text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        )}

        {field.type === "select" && (
          <select
            disabled={field.id === "state" && isLoadingStates}
            {...register(field.id, validationRules)}
            className="border border-gray-300 rounded-md p-2 focus:border-transparent"
          >
            <option value="">
              {field.id === "state" && isLoadingStates
                ? "Loading states..."
                : `Select ${field.label}`}
            </option>

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
    return (
      <ErrorPage
        errorMessage={
          error.message || "Failed to load the health insurance form."
        }
      />
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg my-14">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Health Insurance Application
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
          {isSubmitting ? "Submitting..." : "Submit"}
        </CustomButton>
      </form>
    </div>
  );
};

export default HealthInsuranceForm;
