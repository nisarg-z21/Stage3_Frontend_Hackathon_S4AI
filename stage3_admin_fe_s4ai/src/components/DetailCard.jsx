import React from 'react';
import { AlertTriangle, Clock, FileText, Tag } from 'lucide-react';

const DetailCard = ({ sample }) => {
  const formattedDate = new Date(sample.incident_datetime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
      <div className="p-5">
        <div className="flex items-center mb-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-800">{sample.category}</h3>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Tag className="h-4 w-4 mr-1.5 text-teal-600" />
          <span>{sample.sub_category}</span>
        </div>
        
        <div className="flex items-start mb-4">
          <FileText className="h-4 w-4 mr-1.5 text-gray-500 mt-1 flex-shrink-0" />
          <p className="text-gray-700">{sample.text}</p>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
          <Clock className="h-4 w-4 mr-1.5" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;