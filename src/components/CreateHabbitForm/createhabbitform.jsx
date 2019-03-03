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
  Checkbox,
  Popconfirm,
  message,
  Tooltip,
  Radio,
  InputNumber,
  Select
} from "antd";
import { withFirebase } from "../../services/firebase";
import logo from "../../assets/images/logo_withoutText.png";
import { connect } from "react-redux";
import "./createhabitform.css";
import moment from "moment";
const { TextArea } = Input;
const Option = Select.Option;
class CreateHabitForm extends React.Component {
  state = {
    loading: false,
    noDueDate: false,
    errors: {
      name: {
        error: true,
        message: ""
      },
      description: {
        error: true,
        message: ""
      }
    },
    formValues: {
      name: "",
      description: "",
      importance: 1,
      category: "Health",
      dueDate: moment().toDate(),
      parentGoal:"",
      period:"Dialy",
      frquency:1
      
    },
    disabledForm: false,
    periods: {
      Dialy: {
        max: "10",
        unit: "day"
      },
      Weekly: {
        max: "70",
        unit: "week"
      },
      Monthly: {
        max: "500",
        unit: "month"
      },
      Yearly: {
        max: "1000",
        unit: "year"
      }
    },
    selectedPeriod: {}
  };
  dateFormat = "DD-MMM-YYYY";

  //Joi schema for form
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

  /**
   * create habit in firestore using data provided on the form for current user
   */
  performHabitAction = () => {
    this.setState({ loading: true });
    const { formValues, noDueDate } = this.state;
    const formValuesToSave = { ...formValues };
    //get date as string for saving in firestore
    if (!noDueDate) formValuesToSave.dueDate = formValues.dueDate.toISOString();
    else formValuesToSave.dueDate = false;

    if (this.props.mode == "add")
      //call to firebase habitOps addNewHabit method
      this.props.firebase.habitOps
        .addNewHabit("nabil110176@gmail.com", formValuesToSave)
        .then(() => {
          this.setState({ loading: false });
          this.props.setFormVisibility("Habit", false);
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    else
      this.props.firebase.habitOps
        .updateHabit("nabil110176@gmail.com", formValuesToSave, this.props.id)
        .then(() => {
          this.setState({ loading: false });
          this.props.closeAndUpdate({ ...formValuesToSave, id: this.props.id });
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
  };

  /**
   * mark due date on or off
   */
  dueDateUpdate = e => {
    const noDueDate = e.target.checked;
    this.setState({ noDueDate });
  };

  /**
   * validate each field on change using Joi schema
   */
  validateField = (name, value) => {
    const { formValues } = this.state;
    const field = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(field, schema);
    const errors = { ...this.state.errors };
    formValues[name] = value;
    //if not valid field set validation errors on form
    if (error != null) {
      errors[name].error = true;
      errors[name].message = error.details[0].message;
      this.setState({ errors, formValues });
      return false;
    } else {
      //hide error messages
      errors[name].error = false;
      errors[name].message = "";
      this.setState({ errors, formValues });
      return true;
    }
  };

  /**
   * set value of fields which do not require validation
   */
  setFormValueWithoutValidation = (name, value) => {
    const { formValues } = this.state;
    formValues[name] = value;
    this.setState({ formValues });
  };

  /**
   * enable or disable create button based on form validity
   */
  validateForm = () => {
    const { errors } = this.state;
    for (const key in errors) {
      if (errors[key].error) {
        return false;
      }
    }
    return true;
  };

  /**
   * set form to readonly mode if open with view in mode prop
   */
  componentWillMount() {
    //set default selected period
    this.state.selectedPeriod = this.state.periods[this.state.formValues.period];
    if (this.props.mode == "view") {
      this.setInitFormValues();
      this.state.disabledForm = true;
    }
  }

  /**
   * set values of form in case of existing habit for viewing and editing
   */
  setInitFormValues() {
    const { name, description, importance, progress, dueDate } = this.props;
    const { formValues } = this.state;
    formValues.name = name && name;
    formValues.description = description && description;
    formValues.importance = importance && importance;
    formValues.progress = progress && progress;
    //set errors to false
    for (const key in this.state.errors) {
      this.state.errors[key].error = false;
    }
    if (dueDate) {
      formValues.dueDate = moment(dueDate).toDate();
      this.state.noDueDate = false;
    } else this.state.noDueDate = true;
  }

  /**
   * make form editable for updating habit info
   */
  editForm = () => {
    const disabledForm = false;
    this.setState({ disabledForm });
  };

  /**
   * discard changes in edited form i.e. set to initial values
   */
  cancelChanges = () => {
    this.setInitFormValues();
    const disabledForm = true;
    this.setState({ disabledForm });
  };

  /**
   * show or hide due date control based of mode of form
   */
  shouldShowDueDate() {
    const { noDueDate, disabledForm } = this.state;
    if (disabledForm && noDueDate) return false;
    if (disabledForm && !noDueDate) return true;
    if (!disabledForm) return true;
  }

  /**
   * sets period unit to show in from of period text box
   */
  setPeriod = value => {
    const selectedPeriod = this.state.periods[value];
    const {formValues}=this.state;
    formValues.period=value;
    formValues.frquency=1;
    this.setState({ selectedPeriod, formValues});
  };
  /**
   * sets period frequency
   */
  setPeriodFrequency = value => {
    const {formValues}=this.state;
    formValues.frquency=value;
    this.setState({formValues});
  };
  /**
   * sets parent goal id
   */
  setParentGoal = value => {
    const {formValues}=this.state;
    formValues.parentGoal=value;
    this.setState({formValues});
  };

  /**
   * set width of date picker based on mode of the form i.e. smaller if with checkbox for editble form
   */
  getDatePickerWidth() {
    if (this.state.disabledForm) return "100%";
    return "70%";
  }

  render() {
    const {
      loading,
      noDueDate,
      errors,
      disabledForm,
      formValues,
      periods,
      selectedPeriod
    } = this.state;
    const { mode, goals } = this.props;
    return (
      <div>
        <div className="ghtFormContainer">
          <div className="sHeader">
            {this.getFormHeader()}
            <img src={logo} className="formLogo" />
          </div>
          <form onSubmit={this.performHabitAction}>
            <div className="row formControlDiv">
              <div className="col-md-3">
                <label className="formLabel">Name</label>
              </div>
              <div className="col-md-9">
                <Input
                  disabled={disabledForm}
                  size="small"
                  name="name"
                  value={formValues.name}
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
                  disabled={disabledForm}
                  size="small"
                  name="description"
                  className="formControl"
                  value={formValues.description}
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
                <label className="formLabel">Category</label>
              </div>
              <div className="col-md-9">
                <Radio.Group
                  defaultValue={formValues.category}
                  onChange={e => {
                    this.state.formValues.category = e.target.value;
                  }}
                  buttonStyle="solid"
                >
                  <Radio.Button value="Health">
                    <i
                      className={"fa fa-edit"}
                      style={{ marginRight: "6px" }}
                    />
                    Health
                  </Radio.Button>
                  <Radio.Button value="Personal Development">
                    {" "}
                    <i
                      className={"fa fa-edit"}
                      style={{ marginRight: "6px" }}
                    />
                    Personal Development
                  </Radio.Button>
                  <Radio.Button value="Social">
                    {" "}
                    <i
                      className={"fa fa-edit"}
                      style={{ marginRight: "6px" }}
                    />
                    Social
                  </Radio.Button>
                  <Radio.Button value="Relationship">
                    {" "}
                    <i
                      className={"fa fa-edit"}
                      style={{ marginRight: "6px" }}
                    />
                    Relationship
                  </Radio.Button>
                  <Radio.Button value="Routine Work">
                    {" "}
                    <i
                      className={"fa fa-edit"}
                      style={{ marginRight: "6px" }}
                    />
                    Routine Work
                  </Radio.Button>
                  <Radio.Button value="Other">
                    {" "}
                    <i
                      className={"fa fa-edit"}
                      style={{ marginRight: "6px" }}
                    />
                    Other
                  </Radio.Button>
                </Radio.Group>
              </div>
            </div>

            <div className="row formControlDiv" style={{ marginTop: "10px" }}>
              <div className="col-md-3">
                <label className="formLabel">Parent Goal</label>
              </div>
              <div className="col-md-9">
                <Select
                  showSearch
                  defaultValue="none"
                  style={{ width: "100%" }}
                  size="small"
                  onChange={this.setParentGoal}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="none">None</Option>
                  {goals.map(g => {
                    return <Option value={g.id}>{g.name}</Option>;
                  })}
                </Select>
              </div>
            </div>

            <div className="row formControlDiv">
              <div className="col-md-3">
                <label className="formLabel">Period</label>
              </div>
              <div className="col-md-4">
                <Select
                  defaultValue="Dialy"
                  style={{ width: "100%" }}
                  size="small"
                  onChange={this.setPeriod}
                >
                  {Object.keys(periods).map(p => {
                    return <Option value={p}>{p}</Option>;
                  })}
                </Select>
              </div>
              <div className="col-md-2">
                <InputNumber
                  disabled={disabledForm}
                  size="small"
                  name="periodNumber"
                  value={formValues.frquency}
                  min={1}
                  max={selectedPeriod.max}
                  // value={formValues.name}
                  onChange={this.setPeriodFrequency}
                  className="formControl"
                />
              </div>
              <div className="col-md-3">times a {selectedPeriod.unit}</div>
            </div>

            <div className="row formControlDiv">
              <div className="col-md-3">
                <label className="formLabel">Importance</label>
              </div>
              <div className="col-md-9">
                <Rate
                  disabled={disabledForm}
                  character={<i className="fa fa-exclamation-triangle" />}
                  allowHalf
                  value={formValues.importance}
                  style={{
                    fontSize: 19,
                    color: "#fd3a3a",
                    marginTop: "-0.5%"
                  }}
                  onChange={value => {
                    this.setFormValueWithoutValidation("importance", value);
                  }}
                />
              </div>
            </div>

            {this.shouldShowDueDate() && (
              <div className="row formControlDiv">
                <div className="col-md-3">
                  <label className="formLabel">Track Until</label>
                </div>
                <div className="col-md-9">
                  <DatePicker
                    onChange={value => {
                      this.setFormValueWithoutValidation(
                        "dueDate",
                        moment(value).toDate()
                      );
                    }}
                    disabled={noDueDate || disabledForm}
                    size="small"
                    style={{ width: this.getDatePickerWidth() }}
                    className="formControl"
                    value={moment(formValues.dueDate, this.dateFormat)}
                    format={this.dateFormat}
                  />
                  {!disabledForm && (
                    <Checkbox
                      disabled={disabledForm}
                      style={{ marginLeft: "3%" }}
                      onChange={this.dueDateUpdate}
                      checked={noDueDate}
                    >
                      Keep tracking
                    </Checkbox>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="formControlDiv" style={{ textAlign: "right" }}>
          {this.getActionButton(mode, disabledForm, loading)}
        </div>
      </div>
    );
  }

  /**
   * get header of form based of mode i.e. view, create or edit
   */
  getFormHeader() {
    const { formValues } = this.state;
    const { name } = this.props;
    if (this.props.mode == "view") {
      if (this.state.disabledForm) {
        //view mode disabled
        return (
          <span style={{ cursor: "pointer" }} onClick={this.editForm}>
            <Tooltip title="Edit Habit info">
              <i
                className={"fa fa-edit blackBoldClickableIcon"}
                style={{ marginRight: "10px" }}
              />
              Edit
            </Tooltip>
          </span>
        );
      } else {
        //editable mode
        return (
          <span style={{ cursor: "pointer" }} onClick={this.cancelChanges}>
            <Tooltip title="Cancel">
              <i
                className={"fa fa-times blackBoldClickableIcon"}
                style={{ marginRight: "10px" }}
              />
              Cancel
            </Tooltip>
          </span>
        );
      }
    } else {
      //create mode
      return (
        <span>
          <i className={"fa fa-info-circle"} style={{ marginRight: "10px" }} />
          Fill out the form
        </span>
      );
    }
  }

  getActionButton(mode, disabledForm, loading) {
    if (mode == "add" || (mode == "view" && !disabledForm)) {
      return (
        <Button
          key="submit"
          type="submit"
          loading={loading}
          onClick={this.performHabitAction}
          className="redButton"
          disabled={!this.validateForm()}
        >
          {mode == "view" && "Update"}
          {mode == "add" && "Create"}
        </Button>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    goals: state.goalReducer.Goals
  };
};

export default connect(
  mapStateToProps,
  null
)(withFirebase(CreateHabitForm));
