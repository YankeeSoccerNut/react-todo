import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios';

class ToDo extends Component {

  constructor() {
    super();
    this.state = {
      taskList: []
    };
    this.addNewTask = this.addNewTask.bind(this);
  };

  componentDidMount(){

    // TODO: Use promise and make loadInitialTasks pure

    // load exisiting tasks...if any
    let taskArray = this.loadInitialTasks();
    console.log("#########componentDidMount state##############")
    console.log(this.state.taskList);
  };

  addNewTask(e){   // e is short for event
    console.log('in addNewTask FE');
    e.preventDefault();
    const task = document.getElementById('new-task').value;

    const taskDate = document.getElementById('new-task-date').value;

    axios({
      method: "POST",
      url: "http://localhost:3000/addTask",
      data:{
        taskName: task,
        taskDate: taskDate
      }
    }).then((taskData) => {
      console.log(taskData.data)
      this.setState({taskList: taskData.data});
    })
    .catch((err) => {
      console.log(err);
    });
  };

  loadInitialTasks(){
    console.log('in loadInitialTasks FE');

    axios({
      method: "GET",
      url: "http://localhost:3000/getTasks",
      data:[]
    }).then((taskData) => {
      this.setState(
        {taskList: taskData.data}
      );
      return(taskData.data);
    })
    .catch((err) => {
      console.log(err);
      return({});
    });
  };


  render(){
    console.log("in render..............taskList");
    console.log(this.state.taskList);

    let taskArray = this.state.taskList.map((task,i) => {
      return(
        <tr>
          <td>{task.taskName} - {task.taskDate}</td>
          <td><button className="btn red">Delete</button></td>
          <td><button className="btn blue">Edit</button></td>
        </tr>
      );
    });

    return(
      <div className="to-do-app">
        <NavBar />
        <div className="section no-pad-bot" id="index-banner">
          <div className="container">
            <form onSubmit={this.addNewTask} className="add-box">
              <input type="text" id="new-task" placeholder="New Task" />
              <input type="date" className="datepicker" id="new-task-date" />
              <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {taskArray}
              </tbody>
            </table>
           <h1 className="header center orange-text">To-Do List</h1>
           <div className="row center">
               <h5 className="header col s12 light">Made with React and Express</h5>
           </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ToDo;
