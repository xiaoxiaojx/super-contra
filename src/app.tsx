import * as React from "react";
import * as ReactDom from "react-dom";
import { observer } from "mobx-react";
import {
    GameStart,
    InGame
} from "./component";
import {
    SuperContraStore
} from "./store";
import "./app.scss";

interface AppProps {
    store: SuperContraStore;
}

const store = new SuperContraStore();

@observer
class App extends React.Component<AppProps, {}> {
    render() {
        const { store } = this.props;
        const { gameStatus } = store;
        return (
            <div className="appWrap">
                { gameStatus === 0 &&  <GameStart superContraStore={store}/> }
                { gameStatus === 1 &&  <InGame superContraStore={store} /> }
            </div>
        );
    }
}

ReactDom.render(
    <App store={ store }/>,
    document.getElementById("app")
);
