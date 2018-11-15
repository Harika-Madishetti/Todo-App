import React from "react";

class TodoList extends React.Component {
    render() {
        return (
            <div className="todolist">
                <div className="header">
                    <form>
                        <input placeholder="What needs to be done?">
                        </input>
                        <input type="hidden"></input>
                    </form>
                </div>
            </div>
        );
    }
}

export default TodoList;