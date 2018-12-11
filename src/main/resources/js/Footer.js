import React from "react";

class Footer extends React.Component{
    render(){
        var clearButton = null;
        var unCheckeditems = this.props.entries.length - this.props.completedCount();
        console.log("items : "+unCheckeditems);
        if (this.props.completedCount() > 0) {
            clearButton = (
                <button
                    className="clear-completed"
                    onClick={this.props.onClearCompleted}>
                    Clear completed
                </button>
            );
        }
        return(
            <footer className="footer">
                { this.props.completedCount() > 0 &&
                <span className="todo-count">
                    <strong>{unCheckeditems}
                    </strong> item{ unCheckeditems > 1 && 's'} left
                </span>}
                <ul className="filters">
                    <li>
                        <a
                           href="#/" onClick={this.props.selectAll}>All</a>
                    </li>
                    <li>
                        <a
                        href="#/active" onClick={this.props.selectActive}>Active</a>
                    </li>
                    <li>
                        <a
                            href="#/Completed" onClick={this.props.selectCompleted}>Completed</a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        )
    }
}
export default Footer;