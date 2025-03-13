import { RiErrorWarningLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const ErrorPage = ({ errorMessage = "Something went wrong!" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-3">
          <RiErrorWarningLine size={50} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops!</h1>
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        <Link
          to="/"
          className="inline-block bg-[#191C3B] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#2d304c] transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
