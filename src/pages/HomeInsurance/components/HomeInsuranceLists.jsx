import PreLoader from "components/common/PreLoader";
import ErrorPage from "components/ErrorPage";
import useFetch from "hooks/useFetch";

const HomeInsuranceLists = () => {
  const { data, loading, error } = useFetch("api/insurance/forms/submissions");

  if (loading) return <PreLoader />;
  if (error) return <ErrorPage />;

  return (
    <div className="text-center flex justify-center">
      <div className="my-6 md:mx-3">
        <table className="table-auto min-w-[800px] border border-gray-300">
          <thead className="bg-[#191C3B] text-white">
            <tr>
              {data?.columns?.map((column) => (
                <th key={column} className="px-4 py-2 border border-gray-500">
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.data?.map((row) => (
              <tr key={row.id} className="odd:bg-gray-100 even:bg-white">
                {data?.columns?.map((column) => (
                  <td key={column} className="px-4 py-2 border border-gray-300">
                    {row[column] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeInsuranceLists;
