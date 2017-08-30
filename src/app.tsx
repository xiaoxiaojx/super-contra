import * as React from "react";
import * as ReactDOM from "react-dom";

class App extends React.Component<any, {}> {
    render() {
        return (
            <div>
                hello word!
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
)