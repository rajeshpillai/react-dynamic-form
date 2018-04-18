import React from 'react';
import ReactDOM from 'react-dom';
import './form.css';

export default  class DynamicForm extends React.Component {
    state = {

    }
    constructor(props) {
        super(props);
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state);
    }

    onChange = (e, key) => {
        console.log(`${key} changed ${e.target.value}`);
        this.setState({
            [key]: e.target.value  //this[key].value
        })
    }

    renderForm = () => {
        let model = this.props.model;

        let formUI = model.map((m) => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};

            let name= m.name;
            let value = m.value;
            
            let checked= this.state[name] === key; 
            
            let target = type === "radio" ? name : key;
            return (
                <div key={key} className="form-group">
                    <label className="form-label"
                        key={"l" + key}
                        htmlFor={key}>
                        {m.label}
                    </label>
                    <input {...props}
                        ref={(key)=>{this[m.key]=key}}
                        checked={checked}
                        className="form-input"
                        type={type}
                        key={key}
                        name={name}
                        value={value}
                        onChange={(e)=>{this.onChange(e, target)}}
                    />

                </div>
            );
        });
        return formUI;
    }

    render () {
        let title = this.props.title || "Dynamic Form";

        return (
            <div className={this.props.className}>
                <h3>{title}</h3>
                <form className="dynamic-form" onSubmit={(e)=>{this.onSubmit(e)}}>
                    {this.renderForm()}
                    <div className="form-group">
                        <button type="submit">submit</button>
                    </div>
                </form>
            </div>
        )
    }
}