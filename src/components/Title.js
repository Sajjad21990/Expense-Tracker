import React from "react";

const Title = ({ title }) => {
  return (
    <div className="title">
      <h1
        style={{
          marginTop: "5vh",
          color: "#dfe0e4",
          fontWeight: "400",
          textShadow: ` 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6,
    0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6`,
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default Title;
