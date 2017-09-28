import * as React from "react";
import { observer } from "mobx-react";
import {
    SquaresMap
} from "../../sub";
import {
    SuperContraStore
} from "../../../store";
import "./index.scss";

interface InGameProps {
    store: SuperContraStore;
    children: React.ReactNode;
    className?: string;
}

interface InGameState {
}

@observer
class InGameBG extends React.Component<InGameProps, InGameState> {
    render() {
        const { className = "", children, store } = this.props;
        const { inGameGBLeft } = store;
        const currentClassName = className ? `inGameBGWrap ${className}` : "inGameBGWrap";

        return (
            <div
                className={currentClassName}
                style={{left: inGameGBLeft}}>

                <SquaresMap store={store}/>

                <div className="gameContent">
                    { children }
                </div>
            </div>
        );
    }
}

export default InGameBG;