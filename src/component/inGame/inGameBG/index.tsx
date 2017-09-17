import * as React from "react";
import { observer } from "mobx-react";
// import {
//     KeyCodeType
// } from "common/constant";
import {
    Square
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
    left: number;
}

@observer
class InGameBG extends React.Component<InGameProps, InGameState> {
    render() {
        const { className = "", children, store } = this.props;
        const { inGameGBLeft, staticSquareMap } = store;
        const currentClassName = className ? `inGameBGWrap ${className}` : "inGameBGWrap";

        return (
            <div
                className={currentClassName}
                style={{left: inGameGBLeft}}>
                <div className="gameBackground">
                    {
                        staticSquareMap.map((items, indexX) =>
                            <div className="col" key={`col-${indexX}`}>
                                {
                                    items.map((item, indexY) =>
                                        <Square
                                            key={`col-${indexX},row-${indexY}`}
                                            col={indexX}
                                            row={indexY}
                                            squareSpecies={item.type}
                                            squareStatus={item.status}
                                        //    superContraStore={superContraStore}
                                        />)
                                }
                            </div>
                        )
                    }
                </div>
                <div className="gameContent"> { children } </div>
            </div>
        );
    }
}

export default InGameBG;