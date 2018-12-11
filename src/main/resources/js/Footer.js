import React from "react";

class Footer extends React.Component{

    render() {
        var clearButton = null;
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
                <span className="todo-count">
                </span>
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