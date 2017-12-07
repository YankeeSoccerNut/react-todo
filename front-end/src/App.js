import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {
      students: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount(){

    axios.get('http://localhost:3000/getStudents')
    .then((response)=>{
      // console.log("++++++++++++++++response+++++++++++++++++");
      // console.log(response);
      this.setState({
        students: response.data
      })
    });
};

  handleSubmit(e){
    e.preventDefault();
    let studentName = document.getElementById('new-student').value;

    axios({
      method: "POST",
      url: "http://localhost:3000/addStudent",
      data: { studentName }  //es6 defaults prop name to variable name!
    })
    .then((studentData) => {
      console.log(studentData);
      this.setState({students:studentData.data});
    })
    .catch((err) => {
      console.log(err);
    });
  };

  render() {
    console.log("++++++++++++rendering students+++++++++++");
    console.log(this.state.students);
    let studentsArray = this.state.students.map((student, i)=>{
      return (<li key={i}>{student.name}</li>);
    });

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="new-student" placeholder="New Student"></input>
          <button type="submit">Add Student</button>
        </form>
        {studentsArray}
      </div>
    );
  };

};

export default App;
