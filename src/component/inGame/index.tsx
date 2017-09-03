import * as React from "react";
import { observer } from "mobx-react";
import {
    InGameBG
} from "../";
import {
    SuperContraStore
} from "../../store";
import "./index.scss";

interface InGameProps {
    superContraStore: SuperContraStore;
}

@observer
class InGame extends React.Component<InGameProps, {}> {
    render() {
        const { superContraStore } = this.props;

        return (
            <div className="InGameWrap">
                <InGameBG
                    superContraStore={superContraStore}/>
            </div>
        );
    }
}

export default InGame;