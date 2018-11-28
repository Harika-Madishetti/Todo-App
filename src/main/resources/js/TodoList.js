import React from "react";
import TodoItems from "./TodoItems";
import firebase from "./firebase.js";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
        };
        this.addItem = this.addItem.bind(this);
    }
    addItem(event) {
        event.preventDefault();
        const itemsRef = firebase.database().ref('tasks');
        if (this._inputElement.value != "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            }
            itemsRef.push(newItem);
            console.log("newItem here: "+newItem)
        }
        this._inputElement.value = "";
    }
    componentWillMount(){
        const itemsRef = firebase.database().ref('tasks');
        itemsRef.on('value',(snapshot) => {
            let tasks = snapshot.val();
            let items = [];
            for(let item in tasks) {
                items.push({
                    key:tasks[item].key,
                    text:tasks[item].text
                });
            }
            this.setState({
                items:items,
            });
        });
    }
    render() {
        return (
            <div className="todolist">
                <div className="header"><h1>todos</h1>
                    <form onSubmit={this.addItem}>
                        <input className="new-todo" ref={(a) => this._inputElement = a}
                               placeholder="What needs to be done?">
                        </input>
                    </form>
                    <TodoItems entries ={this.state.items}/>
                </div>
            </div>
        );
    }
}
export default TodoList;