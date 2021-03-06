import React, { Component } from "react";
import { Row, Col } from "antd";
import "./createcard.css";
const CreateCard = ({ background, icon,ccTitle, ccSubTitle, boxShadow,Icon,iconStyle }) => {
  return (
    <div className="createCardMain" style={{ background,boxShadow }}>
      <Row>
        <Col style={{ fontSize: "5em", marginTop:"-5px", textAlign:"center" }} span={8}>
          <Icon style={{height:"50px",width:"50px",fill:"white",...iconStyle}}/>
        </Col>
        <Col style={{height:"125px"}} span={16}>
            <Row id="createTitle">
                <Col span={24}>
                    {ccTitle}
                </Col>
            </Row>
            <Row id="createSubtitle">
                <Col span={24}>
                    {ccSubTitle}
                </Col>
            </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CreateCard;
