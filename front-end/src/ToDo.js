import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios';

class ToDo extends Component {

  constructor() {
    super();
    this.state = {
      validDate: false,
      taskList: []
    };
    this.addNewTask = this.addNewTask.bind(this);
  };

  componentDidMount(){

    // console.log("#########componentDidMount state##############")

    this.getTasks().then((taskArray) => {
      this.setState({taskList: taskArray})
    })
    .catch((err) => {
      console.log(err)
    });
  };

  addNewTask(e){   // e is short for event
    // console.log('in addNewTask FE');

    e.preventDefault();
    const task = document.getElementById('new-task').value;
    const taskDate = document.getElementById('new-task-date').value;

    // using materialize datepicker feature means we could get a blank value....
    if(taskDate === ''){
      alert("Materialize Kluge...Invalid Date");
      this.setState({validDate: false});
      return;
    };

    axios({
      method: "POST",
      url: "http://localhost:3000/addTask",
      data:{
        taskName: task,
        taskDate: taskDate
      }
    }).then((taskData) => {
      console.log(taskData.data)
      this.setState({taskList: taskData.data, validDate: true});
    })
    .catch((err) => {
      console.log(err);
    });
  };

  getTasks(){
  console.log('in getTasks FE');

  let getTasksPromise =
    new Promise(function(resolve, reject) {
      axios({
        method: "GET",
        url: "http://localhost:3000/getTasks",
        data:[]
      }).then((taskData) => {
        resolve(taskData.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
    return getTasksPromise;
  };


  render(){
    // console.log("in render..............taskList");
    // console.log(this.state.taskList);

    let taskArray = this.state.taskList.map((task,i) => {
      return(
        <tr key={i}>
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
              <input type="text" required id="new-task" className="input-field" placeholder="New Task" />
              <input type="date" required className="datepicker" id="new-task-date" />
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
