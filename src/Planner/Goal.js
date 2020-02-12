import React, { Component } from 'react';
import Milestone from './Milestone';
import './Goal.css';

export default class Goal extends Component {
  render() {
    let milestones = this.props.milestones.map(item => {
      return (
        <Milestone 
          title={item.title}
          desc={item.desc}
          target={item.target}
          actual={item.actual}
        />
      )
    });

    return (
      <div className="goal-card">
        <header>
          <h2 className="goal-card__title">{this.props.title}</h2>
          <p className="goal-card__desc">{this.props.desc}</p>
          <p className="goal-card__dates">
            <span className="goal-card__label">Start Date:</span> {this.props.start} 
            <span className="goal-card__label">Target Date:</span> {this.props.target}
          </p>
        </header>

        <section className="goal-subcard">
          <h2 className="goal-subcard__title">Milestones</h2>
          <ul className="milestone__list">
            {milestones}
          </ul>
        </section>
      </div>
    )
  }
}
