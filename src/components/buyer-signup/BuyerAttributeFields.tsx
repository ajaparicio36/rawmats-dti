import React from "react";

const inputStyle =
  "bg-rawmats-secondary-300 rounded-2xl py-2 px-4 w-full border-rawmats-neutral-700 border-[1px] drop-shadow text-rawmats-neutral-700";
const textLabelStyle =
  "ml-4 text-rawmats-neutral-700 font-medium text-sm block";

function BuyerAttributeFields() {
  return (
    <div className="w-screen h-screen bg-white rounded-t-2xl flex-col px-10 overflow-y-auto items-center justify-center">
      <div className="mt-10">
        <input className={inputStyle} />
        <text className={textLabelStyle}>Name</text>
      </div>
      <div className="mt-4">
        <input className={inputStyle} />
        <text className={textLabelStyle}>Age</text>
      </div>
      <div className="mt-4">
        <input className={inputStyle} />
        <text className={textLabelStyle}>Contact Number</text>
      </div>
      <div className="mt-4">
        <input className={inputStyle} />
        <text className={textLabelStyle}>Facebook Link</text>
      </div>
      <button className="bg-rawmats-primary-700 rounded-full py-2 px-16 text-white font-bold text-sm mt-12 mx-auto block mb-8">
        Register
      </button>
    </div>
  );
}

export default BuyerAttributeFields;
