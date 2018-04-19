import React, { Component } from 'react';
import DynamicForm from './components/DynamicForm';
import './App.css';

class App extends Component {
  state = {
    data: [
      {id: 1, name:"a", age:29, qualification:"B.Com",rating:3,gender:"male"},
      {id: 2, name:"b", age:35, qualification:"B.Sc",rating:5,gender:"female"},
      {id: 3, name:"c", age:42, qualification:"B.E",rating:3,gender:"female"},
    ],
    current: {}
  }

  onSubmit = (model) => {
    model.id = +new Date();
    alert(JSON.stringify(model));
    this.setState({
      data: [model, ...this.state.data]
    })
  }

  onEdit = (id) => {
    let record = this.state.data.find((d) => {
      return d.id == id;
    });
    alert(JSON.stringify(record));
    this.setState({
      current: record
    })
  }

  render() {
    let data = this.state.data.map((d) => {
      return (
        <tr key={d.id}>
            <td>{d.name}</td>
            <td>{d.age}</td>
            <td>{d.qualification}</td>
            <td>{d.gender}</td>
            <td>{d.rating}</td>
            <td><button onClick={()=>{this.onEdit(d.id)}}>edit</button></td>
        </tr>
      );
    });
    
    return (
      <div className="App">
        <DynamicForm className="form"
          title = "Registration"
          defaultValues = {this.state.current}
          model={[
            {key: "name", label: "Name", props: {required: true}},
            {key: "age",label: "Age", type: "number"},
            {key: "rating",label: "Rating", type: "number", props:{min:0,max:5}},
            {key: "gender",label: "Gender", type:"radio",options:[
              {key:"male",label:"Male",name:"gender",value:"male"},
              {key:"female",label:"Female",name: "gender",value:"female"}
            ]},
            {key: "qualification",label: "Qualification"},
          ]}
          onSubmit = {(model) => {this.onSubmit(model)}} 
        />

        <table border="1">
          <tbody>{data}</tbody>
        </table>

      </div>
    );
  }
}

export default App;
