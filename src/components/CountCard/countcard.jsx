import React from "react";
import "./countcard.css";
const CountCard = ({background,color,title,subtitle,count}) => {
  return (
    <div className="countCard" style={{background}}>    
      <div className="countCardContent" style={{color}}>
        {count} <span className="countCardSubContent">{subtitle}</span>
      </div>
    </div>
  );
};

export default CountCard;
