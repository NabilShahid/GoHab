import React from "react";
import { Spin, Icon } from "antd";

const Loading = () => {
  return (
    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
  );
};

export default Loading;
