import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Loader2, X } from "lucide-react";
import useAxios from "../api/useAxios";

const FileInputModal = ({ isOpen, onClose, onSubmit }) => {
  const [filePath, setFilePath] = useState("");
  const [minThreshold, setMinThreshold] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  //   const fileInputRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await useAxios.post("/modus_operandi/process_keywords", {
        input_file: filePath,
        min_threshold: minThreshold,
      });

      onSubmit();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Add Complaint Data
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="filePath"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                File Path
              </label>
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="filePath"
                    value={filePath}
                    onChange={(e) => setFilePath(e.target.value)}
                    placeholder="/path/to/data.csv"
                    className="flex-1 rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                  {/* <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFilePath(file.name); // only file name, not full path
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <FileUp className="h-4 w-4" />
                  </button> */}
                </div>
                <div>
                  <p className="mt-1 text-xs text-gray-500">
                    CSV file must contain the columns: <strong>crime_id</strong>
                    , <strong>crimeaditionalinfo</strong>, and{" "}
                    <strong>incident_datetime</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="minThreshold"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Minimum Threshold
              </label>
              <input
                type="number"
                id="minThreshold"
                value={minThreshold}
                onChange={(e) => setMinThreshold(parseInt(e.target.value, 10))}
                min="1"
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
              <p className="mt-1 text-xs text-gray-500">
                Only show keywords that appear at least this many times
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isLoading ? "Processing..." : "Load Data"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default FileInputModal;
