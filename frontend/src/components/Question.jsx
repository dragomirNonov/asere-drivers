import { useState } from "react";

const Question = ({ Title, Text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion-item bg-white mb-4 p-4 w-4/6 rounded-lg">
      <div
        className="accordion-item-header cursor-pointer "
        onClick={toggleAccordion}
      >
        <h2 className="text-xl font-bold pb-1 text-yellow-700">Q: {Title}</h2>
      </div>
      <div
        className={`accordion-item-body ${
          isExpanded ? "max-h-full " : "max-h-0 overflow-hidden "
        }`}
      >
        <div
          className="accordion-item-body-content "
          style={{
            borderTop: "1px solid",
            borderImage:
              "linear-gradient(to right, transparent, rgb(234, 179, 8), transparent) 1",
          }}
        >
          <p className="text-sm pt-2 text-yellow-900 font-bold">{Text}</p>
        </div>
      </div>
    </div>
  );
};

export default Question;
