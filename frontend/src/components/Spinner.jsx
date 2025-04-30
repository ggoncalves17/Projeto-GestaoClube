import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

// Referência -> https://www.pluralsight.com/resources/blog/guides/inline-styling-with-react
const contentorSpinner = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const Spinner = ({ loading }) => {
  return (
    <div style={contentorSpinner}>
      <ClipLoader color="#0F71D3" loading={loading} size={100} />
    </div>
  );
};

export default Spinner;
