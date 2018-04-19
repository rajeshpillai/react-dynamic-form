import React from 'react';
import ReactDOM from 'react-dom';
import './form.css';

export default  class DynamicForm extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("getDerivedSFP: ", nextProps);
        return {
            ...nextProps.defaultValues
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state);
    }

    onChange = (e, key) => {
        console.log(`${key} changed ${e.target.value}`);
        this.setState({
            [key]: e.target.value  //this[key].value
        });
    }


    renderForm = () => {
        let model = this.props.model;
        let defaultValues = this.props.defaultValues;
        
        let formUI = model.map((m) => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};
            let name= m.name;
            let value = m.value;

            let target = key; // type === "radio" ? name : key;
            //value = value ? value : defaultValues[target];
            value = this.state[target];

            let input =  <input {...props}
                    className="form-input"
                    type={type}
                    key={key}
                    name={name}
                    value={value}
                    onChange={(e)=>{this.onChange(e, target)}}
                />;

           if (type == "radio") {
               input = m.options.map((o) => {
                   let checked = o.value == value;
                   console.log("radio: ", o.value, value);
                    return (
                        <input {...props}
                            className="form-input"
                            type={type}
                            key={o.key}
                            name={o.name}
                            checked={checked}
                            value={o.value}
                            onChange={(e)=>{this.onChange(e, o.name)}}
                        />
                    );
               });
           }
            
            return (
                <div key={'g' + key} className="form-group">
                    <label className="form-label"
                        key={"l" + key}
                        htmlFor={key}>
                        {m.label}
                    </label>
                   {input}

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