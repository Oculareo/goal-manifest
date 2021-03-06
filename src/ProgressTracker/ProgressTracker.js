import React, { Component } from 'react';
import Activity from './Activity';
import ActivityForm from './ActivityForm';
import uuid from 'uuid/v4';

export default class ProgressTracker extends Component {
  constructor(props) {
    super(props);
    this.state = { activity: []}

    this.addActivity = this.addActivity.bind(this);
    this.incrementCount = this.incrementCount.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.removeActivity = this.removeActivity.bind(this);
  }

  // Component Mounting
  componentDidMount() {
    this.setState({
      activity: JSON.parse(window.localStorage.getItem("activity")) || []
    });
  }

  // Component updating - Whenever changes to the compoent 
  componentDidUpdate() {
    this.updateLocalStorage();
  }

  // Function that stores locally any changes to activity
  updateLocalStorage() {
    window.localStorage.setItem("activity", JSON.stringify(this.state.activity));    
  }

  // Function that adds new array entry onto state array of activity
  // called from child component: ActivityForm
  addActivity(item) {
    let newItem = {...item, id: uuid()};

    this.setState(state => ({
      activity: [...state.activity, newItem]
    }));
  }

  // Function that removes an array entry from state - activity
  // called from child component: Activity
  removeActivity(itemId) {
    let updateArr = this.state.activity;
    let activeItem = 0;

    updateArr.forEach((cur, idx) => {
      if(cur.id === itemId) {
        activeItem = idx;
      }
    });

    updateArr.splice(activeItem, 1);

    this.setState({
      activity: updateArr
    });

    this.updateLocalStorage();
  }

  // Function counter : increments state count by 1
  // called from child component: Activity
  incrementCount(itemId) {
    let updateArr = this.state.activity;
    let activeItem = 0;

    updateArr.forEach((cur, idx) => {
      if(cur.id === itemId) {
        activeItem = idx;
      }
    });
    
    updateArr[activeItem].count = updateArr[activeItem].count+1;
    
    this.setState({
      activity: updateArr
    });

    this.updateLocalStorage();
  }

  render() {

    let activities = this.state.activity.map(activity => {
      return(
      <Activity
        incrementCount={this.incrementCount}
        removeActivity={this.removeActivity}
        title={activity.title}
        desc={activity.desc}
        count={activity.count}
        timerMin={activity.timerMin}
        timerSec={activity.timerSec}
        breakMin={activity.breakMin}
        breakSec={activity.breakSec}
        id={activity.id}
        key={activity.id}
      />
    )});

    return (
      <section className="wrapper--row progress-tracker">
        {activities}
        <ActivityForm addActivity={this.addActivity} />
      </section>        
    );
  }
}