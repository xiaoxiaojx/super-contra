import * as React from "react";
import { observer } from "mobx-react";
import Square from "./square";
import {
    SuperContraStore
} from "../../../store";
import "./index.scss";

interface SquaresMapProps {
    store: SuperContraStore;
}

@observer
class SquaresMap extends React.PureComponent<SquaresMapProps, {}> {
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
        const lazyLoadMap = this.getLazyLoadMap();
        return (
            <div className="squaresMapWrap">
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
        );
    }
}

export default SquaresMap;