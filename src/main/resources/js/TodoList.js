import React from "react";
import firebase from "./firebase.js";
import Header from "./Header";
import Footer from "./Footer";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            displayMode:'all',
            checked:false,
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
        this.getFilteredItems=this.getFilteredItems.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.selectActive = this.selectActive.bind(this);
        this.selectCompleted = this.selectCompleted.bind(this);
        this.completedCount=this.completedCount.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
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
    }
    deleteItem(key) {
        const itemRef = firebase.database().ref('tasks');
        itemRef.child(key).remove();
    }
    toggleChange(item) {
        const itemRef = firebase.database().ref('tasks');
        var toggle = {
                text : item.text,
                isCompleted : !item.isCompleted
        }
        itemRef.child(item.key).update(toggle);
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
        let filteredItems=[];
        if(this.state.displayMode==='all') {
            filteredItems = this.state.items;
        }
        else if(this.state.displayMode === 'active'){
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
    }
    toggleAll(){
        const itemRef = firebase.database().ref('tasks');
        this.state.items.map((item)=>{
            if(item.isCompleted === this.state.checked){
                var temp ={
                    text : item.text,
                    isCompleted : !item.isCompleted
                }
                itemRef.child(item.key).update(temp);
            }
        });
        this.setState({
            checked:!this.state.checked
        });
    }
    completedCount(){
        var count=0;
        this.state.items.forEach((item)=>{
            if(item.isCompleted){
                count++;
            }
        });
        return count;
    }
    onClearCompleted(){
        this.state.items.forEach((item)=>{
            if(item.isCompleted){
                this.deleteItem(item.key)
            }
        });
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
                {
                    this.state.items.length >0 &&
                    <input id="toggle-all" className="toggle-all" type="checkbox" checked={this.state.checked}
                            onChange={()=>this.toggleAll()}/>}
                    <label htmlFor="toggle-all"/>
                <ul className="todolist">
                    {
                        this.getFilteredItems().map((item)=> {
                        return(<li>
                        <div className="view">
                        <input className="toggle"  type="checkbox" checked={item.isCompleted} onChange={() => this.toggleChange(item)}/>
                        <label>{item.text}</label>
                        <button className="delete" onClick={() => this.deleteItem(item.key)}>
                        </button>
                        </div>
                                <input className="edit" type="text" value={this.state.item.text}/>
                        </li>
                        )
                    })
                    }
                </ul>
            </section>
            {this.state.items.length > 0 &&
            <Footer selectAll={this.selectAll}
                    selectActive={this.selectActive}
                    selectCompleted={this.selectCompleted}
                    completedCount={this.completedCount}
                    onClearCompleted={this.onClearCompleted}
                    entries={this.state.items}/>
            }
        </div>);
    }
}
export default TodoList;