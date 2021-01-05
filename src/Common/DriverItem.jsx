import React from "react";

const DrivertItem = ({ name, img, age }, ...props) => {
  return (
    <div class="white-box">
      <div className="div">
        <div>
          <img src={img} alt={name} />
        </div>
        <div>
          <div>{name}</div>
          <div>Age: {age}</div>
        </div>
      </div>
      <div className="div">
        <div>tasks</div>
        <div>buttons</div>
      </div>
    </div>
  );
};
export default DrivertItem;
