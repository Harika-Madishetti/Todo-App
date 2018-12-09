import React from "react";
import firebase from "./firebase.js";
import Header from "./Header";
import Footer from "./Footer";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            isCompleted:false,
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
    }
    addItem(event) {
        event.preventDefault();
        const itemsRef = firebase.database().ref('tasks');
            if (this._inputElement.value != "") {
                var newItem = {
                    text: this._inputElement.value,
                    isCompleted:false,
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
            let newitems = [];
            for(let item in tasks) {
                newitems.push({
                     key:item,
                    text:tasks[item].text,
                    isCompleted:tasks[item].isCompleted
                });
            }
            this.setState({
                items:newitems,
            });
        });
        console.log("setstate" +this.state.items);
    }
    deleteItem(key) {
        const itemRef = firebase.database().ref('tasks');
        itemRef.child(key).set(null);
    }
    toggleChange(key,isCompleted) {
        console.log("toogleChange"+isCompleted);
        const itemRef = firebase.database().ref('tasks');
        itemRef.child(key).child('isCompleted').set(!isCompleted);
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
                        <input id="toggle-all" className="toggle-all" type="checkbox"/>
                        <label htmlFor="toggle-all"/>
                        <ul className="todolist">
                            {
                                this.state.items.map((item)=> {
                                    return(<li>
                                        <div className="view">
                                            <input className="toggle"  type="checkbox" onChange={()=>this.toggleChange(item.key,item['isCompleted'])} />
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
                    <Footer/>
                </div>
        );
    }
}
export default TodoList;