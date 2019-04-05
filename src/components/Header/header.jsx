import React, { Component } from "react";
import { connect } from "react-redux";
import { filterGoals } from "../../actions/goalActions";
import { filterTasks } from "../../actions/taskActions";
import { updateFilterString } from "../../actions/headerActions";
import "./header.css";
import PAGEKEYS from "../../constants/pageKeys";
import HEADEROPTIONS from "../../constants/headerOptions";
import { Row, Col, Badge, Drawer, Input } from "antd";
const Search = Input.Search;
class Header extends Component {
  state = {
    notificationsVisible: false
  };

  searchValues(value) {
    switch (this.props.title) {
      case HEADEROPTIONS[PAGEKEYS["GOALS"]].Title: {
        this.props.filterGoals(value);
        this.props.updateFilterString(value);
        break;
      }
      case HEADEROPTIONS[PAGEKEYS["TASKS"]].Title: {
        this.props.filterTasks(value);
        this.props.updateFilterString(value);
        break;
      }
      default:{}
    }
  }

  render() {
    const { search } = this.props;
    return (
      <div id="headerAbDiv">
        <Row>
          <Col span={1} />
          <Col id="headerTitle" span={10}>
            <i className={this.props.icon} style={{ marginRight: "2%" }} />
            {this.props.title}
          </Col>
          <Col id="headerOptions" span={11}>
            {search && (
              <Search
                id="headerSearch"
                placeholder="Search"
                value={this.props.currentFilterString}
                onChange={e => {
                  this.searchValues(e.target.value);
                }}
                style={{ width: 210 }}
              />
            )}
          </Col>
          <Col style={{ textAlign: "right", paddingTop: "14px" }} span={1}>
            <Badge count={12} showZero>
              <i
                onClick={() => {
                  this.setState({ notificationsVisible: true });
                }}
                className="fa fa-bell"
                id="bellIcon"
              />
            </Badge>
          </Col>
          <Col span={1} />
        </Row>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={true}
          onClose={() => {
            this.setState({ notificationsVisible: false });
          }}
          visible={this.state.notificationsVisible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

/**
 * state to props mapping
 */
const mapStateToProps = state => {
  return {
    title: state.headerReducer.Title,
    icon: state.headerReducer.Icon,
    search: state.headerReducer.Search,
    currentFilterString: state.headerReducer.CurrentFilterString
  };
};

/**
 * dispatch to props mapping
 */
const mapDispatchToProps = dispatch => {
  return {
    filterGoals: filterPayload => {
      dispatch(filterGoals(filterPayload));
    },
    filterTasks: filterPayload => {
      dispatch(filterTasks(filterPayload));
    },
    updateFilterString: filterPayload => {
      dispatch(updateFilterString(filterPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
