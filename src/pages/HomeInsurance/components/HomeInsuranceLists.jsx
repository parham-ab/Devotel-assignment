import { useState } from "react";
import PreLoader from "components/common/PreLoader";
import ErrorPage from "components/ErrorPage";
import useFetch from "hooks/useFetch";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const HomeInsuranceLists = () => {
  const { data, loading, error } = useFetch("api/insurance/forms/submissions");
  const [selectedInsuranceType, setSelectedInsuranceType] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(new Set());

  if (loading) return <PreLoader />;
  if (error) return <ErrorPage />;

  const insuranceTypes = [
    "all",
    ...new Set(data?.data?.map((item) => item["Insurance Type"])),
  ];

  if (visibleColumns.size === 0 && data?.columns) {
    setVisibleColumns(new Set(data.columns));
  }

  const filteredByType =
    selectedInsuranceType === "all"
      ? data?.data
      : data?.data?.filter(
          (item) => item["Insurance Type"] === selectedInsuranceType
        );

  const filteredBySearch = filteredByType?.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = [...filteredBySearch].sort((a, b) => {
    if (sortOrder === "asc") return a.Age - b.Age;
    if (sortOrder === "desc") return b.Age - a.Age;
    return 0;
  });

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => {
      const newColumns = new Set(prev);
      if (newColumns.has(column)) newColumns.delete(column);
      else newColumns.add(column);
      return newColumns;
    });
  };

  return (
    <div className="text-center flex flex-col items-center w-full px-2">
      <div className="my-4">
        <label htmlFor="insuranceType" className="mr-2 font-medium">
          Filter by Insurance Type:
        </label>
        <select
          id="insuranceType"
          value={selectedInsuranceType}
          onChange={(e) => setSelectedInsuranceType(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          {insuranceTypes.map((type) => (
            <option key={type} value={type}>
              {type === "all" ? "All Types" : type}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Search in table..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 w-full max-w-lg flex flex-wrap gap-2 justify-center">
        {data?.columns?.map((column) => (
          <label key={column} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={visibleColumns.has(column)}
              onChange={() => toggleColumn(column)}
              className="accent-blue-500"
            />
            <span>{column}</span>
          </label>
        ))}
      </div>

      <div className="my-6 w-full">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm md:text-base">
            <thead className="bg-[#191C3B] text-white">
              <tr>
                {data?.columns?.map(
                  (column) =>
                    visibleColumns.has(column) && (
                      <th
                        key={column}
                        className={`px-4 py-2 border border-gray-500 whitespace-nowrap ${
                          column === "Age" ? "cursor-pointer" : ""
                        }`}
                        onClick={column === "Age" ? handleSort : undefined}
                      >
                        <span className="flex items-center gap-1 justify-center">
                          {column}
                          {column === "Age" &&
                            (sortOrder === "asc" ? (
                              <IoChevronUp />
                            ) : sortOrder === "desc" ? (
                              <IoChevronDown />
                            ) : (
                              <IoChevronDown />
                            ))}
                        </span>
                      </th>
                    )
                )}
              </tr>
            </thead>

            <tbody>
              {sortedData?.length > 0 ? (
                sortedData.map((row) => (
                  <tr key={row.id} className="odd:bg-gray-100 even:bg-white">
                    {data?.columns?.map(
                      (column) =>
                        visibleColumns.has(column) && (
                          <td
                            key={column}
                            className="px-4 py-2 border border-gray-300 whitespace-nowrap"
                          >
                            {row[column] ?? "-"}
                          </td>
                        )
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={data?.columns?.length}
                    className="px-4 py-2 text-center"
                  >
                    No matching results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeInsuranceLists;
