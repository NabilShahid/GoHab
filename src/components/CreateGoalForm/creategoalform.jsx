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
  Tooltip
} from "antd";
import { withFirebase } from "../../services/firebase";
import { addGoal } from "../../actions/goalActions";
import { connect } from "react-redux";
import logo from "../../assets/images/logo_withoutText.png";
import "./creategoalform.css";
import moment from "moment";
const { TextArea } = Input;
class CreateGoalForm extends React.Component {
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
      progress: 25,
      dueDate: moment().toDate(),
      dateCompleted:false
    },
    disabledForm: false
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
   * create goal in firestore using data provided on the form for current user
   */
  performGoalAction = () => {
    this.setState({ loading: true });
    const { formValues, noDueDate } = this.state;
    const formValuesToSave = { ...formValues };
    //get date as string for saving in firestore
    if (!noDueDate) formValuesToSave.dueDate = formValues.dueDate.toISOString();
    else formValuesToSave.dueDate = false;

    if (this.props.mode == "add")
      //call to firebase goalOps addNewGoal method
      this.props.firebase.goalOps
        .addNewGoal(this.props.userEmail, formValuesToSave)
        .then(g => {
          this.setState({ loading: false });
          this.props.addGoal({ ...formValuesToSave, id: g.id });
          this.props.setPopupVisibility("Goal", false);
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    else
      this.props.firebase.goalOps
        .updateGoal(
          this.props.userEmail,
          formValuesToSave,
          this.props.goalOptions.id
        )
        .then(() => {
          this.setState({ loading: false });
          this.props.closeAndUpdate({
            ...formValuesToSave,
            id: this.props.goalOptions.id
          });
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
    if (this.props.mode == "view") {
      this.setInitFormValues();
      this.setState({ disabledForm: true });
    }
  }

  /**
   * set values of form in case of existing goal for viewing and editing
   */
  setInitFormValues() {
    const {
      name,
      description,
      importance,
      progress,
      dueDate,
      dateCompleted
    } = this.props.goalOptions;
    const { formValues } = this.state;
    formValues.name = name || "";
    formValues.description = description || "";
    formValues.importance = importance || 1;
    formValues.progress = progress || 25;
    formValues.dateCompleted=dateCompleted||false;
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
   * make form editable for updating goal info
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
   * set width of date picker based on mode of the form i.e. smaller if with checkbox for editble form
   */
  getDatePickerWidth() {
    if (this.state.disabledForm) return "100%";
    return "70%";
  }

  render() {
    const { loading, noDueDate, errors, disabledForm, formValues } = this.state;
    const { mode } = this.props;
    return (
      <div>
        <div className="ghtFormContainer">
          <div className="sHeader">
            {this.getFormHeader()}
            <img src={logo} className="formLogo" />
          </div>
          <form onSubmit={this.performGoalAction}>
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
                    color: "var(--primary-color)",
                    marginTop: "-0.5%"
                  }}
                  onChange={value => {
                    this.setFormValueWithoutValidation("importance", value);
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
                  {!disabledForm && (
                    <span>
                      <Slider
                        disabled={disabledForm}
                        onChange={value => {
                          this.setFormValueWithoutValidation("progress", value);
                        }}
                        value={formValues.progress}
                        min={0}
                        max={mode == "add" ? 99 : 100}
                        style={{
                          width: "80%",
                          margin: "0% 6%",
                          display: "inline-block"
                        }}
                      />
                      <i
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "18px"
                        }}
                        className="fa fa-check"
                      />
                    </span>
                  )}
                  {disabledForm && (
                    <div className="goalProgress">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: formValues.progress + "%" }}
                          aria-valuenow={formValues.progress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <span className="progressNumber">
                            {formValues.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {this.shouldShowDueDate() && (
              <div className="row formControlDiv">
                <div className="col-md-3">
                  <label className="formLabel">Due Date</label>
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
                      No Due Date
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
            <Tooltip title="Edit goal info">
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
          onClick={this.performGoalAction}
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

/**
 * state to props mapping
 */
const mapStateToProps = state => {
  return {

    userEmail: state.userReducer.User.Email
  };
};


/**
 * dispatch to props mapping form updating user
 */
const mapDispatchToProps = dispatch => {
  return {
    addGoal: goalPayload => {
      dispatch(addGoal(goalPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(CreateGoalForm));
