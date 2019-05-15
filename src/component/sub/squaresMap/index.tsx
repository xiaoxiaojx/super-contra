import * as React from "react";
import { observer } from "mobx-react";
import Square from "./square";
import {
    SuperContraStore
} from "../../../store";
import "./index.scss";
import { StaticSquareManagementType } from "src/common/constant";

interface SquaresMapProps {
    store: SuperContraStore;
}

const LIMIT: number = 16;
const GAME_WIDTH: number = 512;

@observer
class SquaresMap extends React.PureComponent<SquaresMapProps, {}> {
    getLazyLoadMap() {
        const { staticSquareMap, inGameGBLeft } = this.props.store;
        const OFFSET = Math.abs(inGameGBLeft) / GAME_WIDTH * LIMIT;
        return staticSquareMap.reduce((preVal, currentVal) => {
            const items = [...currentVal];
            const current = items.splice(OFFSET, LIMIT);
            preVal.push(current);
            return preVal;
        }, [] as StaticSquareManagementType[][]);
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