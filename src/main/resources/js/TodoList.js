import React from "react";
import firebase from "./firebase.js";
import Header from "./Header";

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
                        <Header/>
                        <form onSubmit={this.addItem}>
                        <input className="new-todo" ref={(a) => this._inputElement = a}
                               placeholder="What needs to be done?">
                        </input>
                </form>
                    </header>
                    <section className="main">
                        <input id="toggle-all" class="toggle-all" type="checkbox"/>
                        <label htmlFor="toggle-all"/>
                        <ul className="todolist">
                            {
                                this.state.items.map((item)=> {
                                    return(<li>
                                        <div className="view">
                                            <input className="toggle"  type="checkbox" />
                                            <label>{item.text}</label>
                                            <button className="delete" onClick={()=> this.deleteItem(item.key)}>
                                            </button>
                                        </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                </div>
        );
    }
}
export default TodoList;