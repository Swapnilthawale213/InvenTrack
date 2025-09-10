import React from 'react';

const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-2 text-[#281e5d]">{title}</h2>
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default ChartCard;
