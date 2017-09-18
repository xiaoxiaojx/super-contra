import * as React from "react";
import { observer } from "mobx-react";
import InGameBG from "./inGameBG";
import {
    Contra
} from "../sub";
import {
    SuperContraStore
} from "../../store";
import "./index.scss";

interface InGameProps {
    store: SuperContraStore;
}

@observer
class InGame extends React.PureComponent<InGameProps, {}> {
    render() {
        const { store } = this.props;

        return (
            <InGameBG
                    store={store}>
                    <Contra
                        store={store}/>
            </InGameBG>
        );
    }
}

export default InGame;