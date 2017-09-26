import * as React from "react";
import { observer } from "mobx-react";
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
}

@observer
class InGameBG extends React.Component<InGameProps, InGameState> {
    getLazyLoadMap() {
        const { staticSquareMap, inGameGBLeft } = this.props.store;
        const limit = 16;
        const offset = Math.abs(inGameGBLeft) / 512 * 16;
        const initArray = [];
        return staticSquareMap.reduce((preVal, currentVal) => {
            const items = [...currentVal];
            const current = items.splice(offset, limit);
            preVal.push(current);
            return preVal;
        }, initArray);
    }
    render() {
        const { className = "", children, store } = this.props;
        const { inGameGBLeft } = store;
        const lazyLoadMap = this.getLazyLoadMap();
        const currentClassName = className ? `inGameBGWrap ${className}` : "inGameBGWrap";

        return (
            <div
                className={currentClassName}
                style={{left: inGameGBLeft}}>
                <div className="gameBackground">
                    {
                        lazyLoadMap.map((items, indexX) =>
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