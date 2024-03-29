import React from "react";

import "./DynamicInput.css"

function DynamicInput({ field, handleAddFields, handleInputChange, handleRemoveFields, fieldName, placeholder, label, btnTxt }) {

  return (
    <>
      <div className="dynamic_cont">
        <label htmlFor={fieldName}>{label}</label>
        {field.map((element, index) => (
          <div key={index} className="dynamic_div">
            <input
              type="text"
              placeholder={placeholder}
              value={element}
              onChange={(event) => handleInputChange(fieldName, index, event)}
              className="dynamic_input"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveFields(fieldName, index)}
                className="remove_dynamic"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => handleAddFields(fieldName)} className="add_dynamic">
          {btnTxt}
        </button>
      </div>
    </>
  );
}

export default DynamicInput;
