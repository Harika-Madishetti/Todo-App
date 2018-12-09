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
            displayMode:'all',
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
        this.getFilteredItems=this.getFilteredItems.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.selectActive = this.selectActive.bind(this);
        this.selectCompleted = this.selectCompleted.bind(this);
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
    selectAll(){
        console.log("selected");
        this.setState({
          displayMode:'all'
        });
    }
    selectActive() {
        console.log("Active");
        this.setState({
            displayMode:'active'
        });
    }
    selectCompleted() {
        console.log("Completed");
        this.setState({
            displayMode:'completed'
        });
    }
    getFilteredItems(){
        console.log("getFilteredItems");
        let filteredItems=[];
        if(this.state.displayMode==='all') {
            filteredItems = this.state.items;
            console.log("getFilteredItemsinside");
        }
        else if(this.state.displayMode === 'active'){
            console.log("activemode")
            this.state.items.forEach((item)=> {
                if(!(item.isCompleted)){
                    filteredItems.push(item);
                }
            });
        }
        else if(this.state.displayMode === 'completed'){
            this.state.items.forEach((item)=>{
                if(item.isCompleted){
                    filteredItems.push(item);
                }
            });
        }
        return filteredItems;
        console.log("fil" +filteredItems);
    }
    render() {
        return (<div>
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
                        this.getFilteredItems().map((item)=> {
                        return(<li>
                        <div className="view">
                        <input className="toggle"  type="checkbox" onChange={() => this.toggleChange(item.key, item['isCompleted'])}/>
                        <label>{item.text}</label>
                        <button className="delete" onClick={() => this.deleteItem(item.key)}>
                        </button>
                        </div>
                        </li>
                        )
                    })
                    }
                </ul>
            </section>
            <Footer selectAll={this.selectAll}
                    selectActive={this.selectActive}
                    selectCompleted={this.selectCompleted}/>
        </div>);
    }
}
export default TodoList;