import React, { Component } from "react";
import Joi from "joi";

import {
  Modal,
  Button,
  Input,
  Rate,
  Icon,
  Slider,
  DatePicker,
  Checkbox
} from "antd";
import { withFirebase } from "../../services/firebase";
import logo from "../../assets/images/logo_withoutText.png";
import "./creategoalform.css";
import moment from "moment";
const { TextArea } = Input;
class CreateGoalForm extends React.Component {
  state = {
    loading: false,
    dueDate: false,
    errors: {
      name: {
        error: true,
        message: ""
      },
      description: {
        error: true,
        message: ""
      }
    }
  };

  dateFormat = "DD-MMM-YYYY";

  formValues = {
    name: "",
    description: "",
    importance: 1,
    progress: 25,
    dueDate: moment().toDate()
  };
  schema = {
    name: Joi.string()
      .max(50)
      .required()
      .label("Name"),
    description: Joi.string()
      .max(255)
      .required()
      .label("Description")
  };

  createGoal = () => {
    this.setState({ loading: true });
    if(this.formValues.dueDate)
    this.formValues.dueDate = this.formValues.dueDate.toISOString();
    this.props.firebase.goalOps
      .addNewGoal("nabil110176@gmail.com", this.formValues)
      .then(() => {
        this.setState({ loading: false });
        this.props.close();
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  };

  dueDateUpdate = e => {
    const dueDate = e.target.checked;
    this.setState({ dueDate });
    this.formValues.dueDate=false
  };

  validateField = (name, value) => {
    const field = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(field, schema);
    const errors = { ...this.state.errors };

    if (error != null) {
      errors[name].error = true;
      errors[name].message = error.details[0].message;
      this.setState({ errors });
      return false;
    } else {
      errors[name].error = false;
      errors[name].message = "";
      this.setState({ errors });
      this.formValues[name] = value;
      return true;
    }
  };

  validateForm=()=>{    
    const {errors}=this.state;
    for(const key in errors)
    {
      if(errors[key].error){
        return false;
      }
    }
    return true;
  }
  

  render() {
    const { loading, dueDate, errors } = this.state;
    const { close } = this.props;
    return (
      <div>
        <Modal
          visible={true}
          width="53%"
          title="Create Goal"
          onOk={close}
          centered
          bodyStyle={{ overflowY: "auto" }}
          style={{ top: "10px" }}
          onCancel={close}
          footer={[
            <Button key="back" onClick={close} className="blackButton">
              Cancel
            </Button>,
            <Button
              key="submit"
              type="submit"
              loading={loading}
              onClick={this.createGoal}
              className="redButton"
              disabled={!this.validateForm()}
            >
              Create
            </Button>
          ]}
        >
          <div className="ghtFormContainer">
            <div className="sHeader">
              <i
                className="fa fa-info-circle"
                style={{ marginRight: "10px" }}
              />
              Fill out the form
              <img src={logo} className="formLogo" />
            </div>
            <form onSubmit={this.createGoal}>
              <div className="row formControlDiv">
                <div className="col-md-3">
                  <label className="formLabel">Name</label>
                </div>
                <div className="col-md-9">
                  <Input
                    size="small"
                    name="name"
                    defaultValue={this.formValues.name}
                    onChange={e => {
                      this.validateField(e.target.name, e.target.value);
                    }}
                    className="formControl"
                  />
                  {errors.name.error && (
                    <span className="formError">{errors.name.message}</span>
                  )}
                </div>
              </div>

              <div className="row formControlDiv">
                <div className="col-md-3">
                  <label className="formLabel">Description</label>
                </div>
                <div className="col-md-9">
                  <TextArea
                    size="small"
                    name="description"
                    className="formControl"
                    defaultValue={this.formValues.description}
                    onChange={e => {
                      this.validateField(e.target.name, e.target.value);
                    }}
                  />
                  {errors.description.error && (
                    <span className="formError">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="row formControlDiv">
                <div className="col-md-3">
                  <label className="formLabel">Importance</label>
                </div>
                <div className="col-md-9">
                  <Rate
                    character={<i className="fa fa-exclamation-triangle" />}
                    allowHalf
                    defaultValue={this.formValues.importance}
                    style={{
                      fontSize: 19,
                      color: "#fd3a3a",
                      marginTop: "-0.5%"
                    }}
                    onChange={value => {
                      this.formValues.importance = value;
                    }}
                  />
                </div>
              </div>

              <div className="row formControlDiv">
                <div className="col-md-3">
                  <label className="formLabel">Current Progress</label>
                </div>
                <div className="col-md-9">
                  <div className="iconWrapper">
                    <i
                      style={{ color: "#fd3a3a", fontSize: "18px" }}
                      className="fa fa-times"
                    />
                    <Slider
                      onChange={value => {
                        this.formValues.progress = value;
                      }}
                      defaultValue={this.formValues.progress}
                      min={0}
                      max={99}
                      style={{
                        width: "80%",
                        margin: "0% 6%",
                        display: "inline-block"
                      }}
                    />
                    <i
                      style={{ color: "#fd3a3a", fontSize: "18px" }}
                      className="fa fa-check"
                    />
                  </div>
                </div>
              </div>

              <div className="row formControlDiv">
                <div className="col-md-3">
                  <label className="formLabel">Due Date</label>
                </div>
                <div className="col-md-9">
                  <DatePicker
                    onChange={value => {
                      this.formValues.dueDate = value.toDate();
                    }}
                    disabled={dueDate}
                    size="small"
                    style={{ width: "70%" }}
                    className="formControl"
                    defaultValue={moment(
                      this.formValues.dueDate,
                      this.dateFormat
                    )}
                    format={this.dateFormat}
                  />
                  <Checkbox
                    style={{ marginLeft: "3%" }}
                    onChange={this.dueDateUpdate}
                  >
                    No Due Date
                  </Checkbox>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withFirebase(CreateGoalForm);
