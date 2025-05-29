// import React from "react";
// import { AlertTriangle, Clock, FileText, Tag } from "lucide-react";

// const DetailCard = ({ sample }) => {
//   const formattedDate = new Date(sample.incident_datetime).toLocaleString(
//     "en-US",
//     {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }
//   );

//   // Convert line breaks in text to proper HTML breaks
//   const formattedText = sample.crimeaditionalinfo
//     ?.split("\r\n")
//     .map((line, i) => (
//       <React.Fragment key={i}>
//         {line}
//         {i !== sample.crimeaditionalinfo.split("\r\n").length - 1 && <br />}
//       </React.Fragment>
//     ));

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
//       <div className="p-5">
//         {sample.category && (
//           <div className="flex items-center mb-3">
//             <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
//             <h3 className="text-lg font-medium text-gray-800">
//               {sample.category}
//             </h3>
//           </div>
//         )}

//         {sample.sub_category && (
//           <div className="flex items-center text-sm text-gray-600 mb-4">
//             <Tag className="h-4 w-4 mr-1.5 text-teal-600" />
//             <span>{sample.sub_category}</span>
//           </div>
//         )}

//         <div className="flex items-start mb-4">
//           <FileText className="h-4 w-4 mr-1.5 text-gray-500 mt-1 flex-shrink-0" />
//           <p className="text-gray-700">{formattedText}</p>
//         </div>

//         <div className="flex items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
//           <Clock className="h-4 w-4 mr-1.5" />
//           <span>{formattedDate}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailCard;

import React from "react";
import { AlertTriangle, Clock, FileText, Tag, Fingerprint } from "lucide-react";

const DetailCard = ({ sample }) => {
  const formattedDate = new Date(sample.incident_datetime).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const formattedText = sample.crimeaditionalinfo
    ?.split("\r\n")
    .map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i !== sample.crimeaditionalinfo.split("\r\n").length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
      {/* 🔷 Highlighted Crime ID */}
      <div className="bg-[#0361ae] text-white px-5 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Fingerprint className="h-5 w-5 text-white mr-2" />
          <h2 className="text-lg font-semibold tracking-wide">
            Crime ID: {sample.crime_id}
          </h2>
        </div>
      </div>

      <div className="p-5">
        {/* Category */}
        {sample.category && (
          <div className="flex items-center mb-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-md font-medium text-gray-800">
              {sample.category}
            </h3>
          </div>
        )}

        {/* Sub Category */}
        {sample.sub_category && (
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <Tag className="h-4 w-4 mr-1.5 text-teal-600" />
            <span>{sample.sub_category}</span>
          </div>
        )}

        {/* Description */}
        <div className="flex items-start mb-4">
          <FileText className="h-4 w-4 mr-1.5 text-gray-500 mt-1 flex-shrink-0" />
          <p className="text-gray-700">{formattedText}</p>
        </div>

        {/* Timestamp */}
        <div className="flex items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
          <Clock className="h-4 w-4 mr-1.5" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
