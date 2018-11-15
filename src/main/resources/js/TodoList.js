import React from "react";
import TodoItems from "./TodoItems";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[]
        };
        this.addItem = this.addItem.bind(this);
    }

    addItem(e) {
        if(this._inputElement.value != "") {
            var newItem = {
                text : this._inputElement.value,
                key : Date.now()
            };
            this.setState((prevState) => {
                return {
                    items:prevState.items.concat(newItem)
                };
            });
        }
        this._inputElement.value = "";
        console.log(this.state.items);
        e.preventDefault();
    }
    render() {
        return (
            <div className="todolist">
                <div className="header">
                    <form  onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a}
                               placeholder="What needs to be done?">
                        </input>
                        <input type="hidden"></input>
                    </form>
                    <TodoItems entries ={this.state.items}/>
                </div>
            </div>
        );
    }
}

export default TodoList;