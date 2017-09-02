import * as React from "react";
import { observer } from "mobx-react";
import {
    SuperContraStore
} from "../../store";
import {
    Square
} from "../sub";
import "./index.scss";

interface InGameProps {
    store: SuperContraStore;
}

@observer
class InGame extends React.Component<InGameProps, {}> {
    render() {
        return (
            <div className="InGameWrap">
                <Square
                    imgName="base.png"
                    position="0px -256px"/>
            </div>
        );
    }
}

export default InGame;