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
        this.deleteItem = this.deleteItem.bind(this);
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
                console.log("newItem here: " + newItem)
            }
            this._inputElement.value = "";
    }
    componentWillMount(){
        console.log("in component will mount");
        const itemsRef = firebase.database().ref('tasks');
        itemsRef.on('value',(snapshot) => {
            let tasks = snapshot.val();
            let items = [];
            for(let item in tasks) {
                items.push({
                     key:item,
                    text:tasks[item].text
                });
            }
            this.setState({
                items:  items,
            });
        });
    }
    deleteItem(itemId) {
        const itemRef = firebase.database().ref(`/tasks/${itemId}`);
        itemRef.remove();
    }
    render() {
        return (
                <div>
                    <header className="header">
                    <h1>todos</h1>
                        <form onSubmit={this.addItem}>
                        <input className="new-todo" ref={(a) => this._inputElement = a}
                               placeholder="What needs to be done?">
                        </input>
                </form>
                    </header>
                    <section className="main">
                        <ul className="todolist">
                            {
                                this.state.items.map((item)=> {
                                    return(<li>
                                            <input className="toggle"  type="checkbox"/>
                                            <label></label>
                                            <button className="delete" onClick={()=> this.deleteItem(item.key)}>
                                            </button>
                                            {item.text}
                                        </li>)
                                })
                            }
                        </ul>
                    </section>
                </div>
        );
    }
}
export default TodoList;