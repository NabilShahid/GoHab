import React from "react";
import { Spin, Icon } from "antd";

const Loading = ({fontSize,color}) => {
  return (
    <Spin indicator={<Icon type="loading" style={{ fontSize: (fontSize?fontSize:"35px"),color:(color?color:"var(--primary-color)") }} spin />} />
  );
};

export default Loading;
