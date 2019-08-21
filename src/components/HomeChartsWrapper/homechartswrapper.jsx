import React, { Component } from 'react';
import OverduePendingChart from "../../charts/overduePendingChart";
class HomeChartsWrapper extends Component {
    state = {  }
    render() { 
        return (  <div className="row">
          <div className="col-md-4 homeChartDiv">
            <OverduePendingChart />
          </div>
          <div className="col-md-4 homeChartDiv">
            <OverduePendingChart/>
          </div>
          <div className="col-md-4 homeChartDiv">
            <OverduePendingChart/>
          </div>
        </div> );
    }
}
 
export default HomeChartsWrapper;