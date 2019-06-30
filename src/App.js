import React, { Component } from "react";
import DynamicForm from "./components/DynamicForm";
import "./App.css";

class App extends Component {
  state = {
    data: [
      {
        id: 1,
        name: "a",
        age: 29,
        qualification: "B.Com",
        rating: 3,
        gender: "male",
        city: "Kerala",
        skills: ["reactjs", "angular", "vuejs"]
      },
      {
        id: 2,
        name: "b",
        age: 35,
        qualification: "B.Sc",
        rating: 5,
        gender: "female",
        city: "Mumbai",
        skills: ["reactjs", "angular"]
      },
      {
        id: 3,
        name: "c",
        age: 42,
        qualification: "B.E",
        rating: 3,
        gender: "female",
        city: "Bangalore",
        skills: ["reactjs"]
      }
    ],
    current: {}
  };

  onSubmit = model => {
    let data = [];
    if (model.id) {
      data = this.state.data.filter(d => {
        return d.id != model.id;
      });
    } else {
      model.id = +new Date();
      data = this.state.data.slice();
    }

    this.setState({
      data: [model, ...data],
      current: {} // todo
    });
  };

  onEdit = id => {
    let record = this.state.data.find(d => {
      return d.id == id;
    });
    //alert(JSON.stringify(record));
    this.setState({
      current: record
    });
  };

  onNewClick = e => {
    this.setState({
      current: {}
    });
  };

  render() {
    let data = this.state.data.map(d => {
      return (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>{d.age}</td>
          <td>{d.qualification}</td>
          <td>{d.gender}</td>
          <td>{d.rating}</td>
          <td>{d.city}</td>
          <td>{d.skills && d.skills.join(",")}</td>
          <td>
            <button
              onClick={() => {
                this.onEdit(d.id);
              }}
            >
              edit
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App">
        <div className="form-actions">
          <button onClick={this.onNewClick} type="submit">
            NEW
          </button>
        </div>
        <DynamicForm
          key={this.state.current.id}
          className="form"
          title="Registration"
          defaultValues={this.state.current}
          model={[
            { key: "name", label: "Name", props: { required: true } },
            { key: "age", label: "Age", type: "number" },
            {
              key: "rating",
              label: "Rating",
              type: "number",
              props: { min: 0, max: 5 }
            },
            {
              key: "gender",
              label: "Gender",
              type: "radio",
              options: [
                { key: "male", label: "Male", name: "gender", value: "male" },
                {
                  key: "female",
                  label: "Female",
                  name: "gender",
                  value: "female"
                }
              ]
            },
            { key: "qualification", label: "Qualification" },
            {
              key: "city",
              label: "City",
              type: "select",
              value: "Kerala",
              options: [
                { key: "mumbai", label: "Mumbai", value: "Mumbai" },
                { key: "bangalore", label: "Bangalore", value: "Bangalore" },
                { key: "kerala", label: "Kerala", value: "Kerala" }
              ]
            },
            {
              key: "skills",
              label: "Skills",
              type: "checkbox",
              options: [
                { key: "reactjs", label: "ReactJS", value: "reactjs" },
                { key: "angular", label: "Angular", value: "angular" },
                { key: "vuejs", label: "VueJS", value: "vuejs" }
              ]
            }
          ]}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />

        <table border="1">
          <tbody>{data}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
