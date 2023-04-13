import React from "react";

function DynamicInput({ field, handleAddFields, handleInputChange, handleRemoveFields, fieldName, placeholder, label, btnTxt }) {

  return (
    <>
      <div>
        <label htmlFor={fieldName}>{label}</label>
        {field.map((element, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={placeholder}
              value={element}
              onChange={(event) => handleInputChange(fieldName, index, event)}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveFields(fieldName, index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => handleAddFields(fieldName)}>
          {btnTxt}
        </button>
      </div>
    </>
  );
}

export default DynamicInput;
