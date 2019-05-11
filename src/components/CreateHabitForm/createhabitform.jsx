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
import { addHabit } from "../../actions/habitActions";
import "./createhabitform.css";
import moment from "moment";
import { updateSubItemsCount } from "../../actions/goalActions";
const { TextArea } = Input;
const Option = Select.Option;
class CreateHabitForm extends React.Component {
  state = {
    loading: false,
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
      category: "Health",
      parentGoal: "",
      period: "Dialy",
      frquency: 1
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
    const { formValues } = this.state;
    const formValuesToSave = { ...formValues };

    if (this.props.mode == "add") {
      //call to firebase habitOps addNewHabit method
      formValuesToSave.completed = false;
      this.props.firebase.habitOps
        .addNewHabit("nabil110176@gmail.com", formValuesToSave)
        .then(h => {
          this.setState({ loading: false });
          this.props.addHabit({ ...formValuesToSave, id: h.id });
          this.updateSubHabitsCountForGoal(formValues.parentGoal);
          if (this.props.close) this.props.close();
          else this.props.setFormVisibility("Habit", false);
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    } else {
      this.props.firebase.habitOps
        .updateHabit("nabil110176@gmail.com", formValuesToSave, this.props.id)
        .then(() => {
          this.setState({ loading: false });
          this.props.closeAndUpdate({ ...formValuesToSave, id: this.props.id });
          this.updateSubHabitsCountForGoal(false);
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
      
    }
  };

  /**
   *update sub habits count prop function call wrapper
   */
  updateSubHabitsCountForGoal(goalId) {
    this.props.updateSubItemsCount({
      items: this.props.habits,
      goalId,
      filterGoals: false,
      itemName: "subHabits"
    });
  }

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
    this.state.selectedPeriod = this.state.periods[
      this.state.formValues.period
    ];
    if (this.props.mode == "view") {
      this.setInitFormValues();
      this.state.disabledForm = true;
    } else if (this.props.mode == "add" && this.props.parentGoal) {
      let formValues = { ...this.state.formValues };
      formValues.parentGoal = this.props.parentGoal;
      this.setState({ formValues });
    }
  }

  /**
   * set values of form in case of existing habit for viewing and editing
   */
  setInitFormValues() {
    const {
      name,
      description,
      category,
      parentGoal,
      period,
      frquency
    } = this.props;
    const { formValues } = this.state;
    formValues.name = name || "";
    formValues.description = description || "";
    formValues.category = category || "Health";
    formValues.parentGoal = parentGoal || "";
    formValues.period = period || "Dialy";
    formValues.frquency = frquency || 1;
    //set errors to false
    for (const key in this.state.errors) {
      this.state.errors[key].error = false;
    }
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
   * sets period unit to show in from of period text box
   */
  setPeriod = value => {
    const selectedPeriod = this.state.periods[value];
    const { formValues } = this.state;
    formValues.period = value;
    formValues.frquency = 1;
    this.setState({ selectedPeriod, formValues });
  };
  /**
   * sets period frequency
   */
  setPeriodFrequency = value => {
    const { formValues } = this.state;
    formValues.frquency = value;
    this.setState({ formValues });
  };
  /**
   * sets parent goal id
   */
  setParentGoal = value => {
    const { formValues } = this.state;
    formValues.parentGoal = value;
    this.setState({ formValues });
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
                  size="small"
                  defaultValue={formValues.category}
                  disabled={disabledForm}
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
                  value={formValues.parentGoal}
                  disabled={disabledForm}
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
                  disabled={disabledForm}
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

const mapDispatchToProps = dispatch => {
  return {
    addHabit: taskPayload => {
      dispatch(addHabit(taskPayload));
    },
    updateSubItemsCount: itemsPayload => {
      dispatch(updateSubItemsCount(itemsPayload));
    }
  };
};

const mapStateToProps = state => {
  return {
    goals: state.goalReducer.Goals,
    habits:state.habitReducer.Habits
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(CreateHabitForm));
