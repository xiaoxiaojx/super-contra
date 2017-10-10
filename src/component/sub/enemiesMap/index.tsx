import * as React from "react";
import { observer } from "mobx-react";
import Enemy from "./enemy";
import {
    SuperContraStore
} from "../../../store";
import {
    PositionType
} from "../../../common/constant";

interface EnemiesMapProps {
    store: SuperContraStore;
}

@observer
class EnemiesMap extends React.Component<EnemiesMapProps, {}> {
    updatePosition(position: PositionType, index: number): void {
        const { updateDynamicSquare } = this.props.store;
        updateDynamicSquare({position}, index);
    }
    render() {
        const { dynamicSquareMap, inGameGBLeft, deleteDynamicSquare, contraInfo, updateContraLifeStatus, updateGameStatus } = this.props.store;
        return (
            <div>
                {
                    dynamicSquareMap.map((item, index) => {
                        return item ?
                            <Enemy
                                index={index}
                                key={`Mushroom-${index}`}
                                dynamicData={item}
                                contraInfo={contraInfo}
                                inGameGBLeft={inGameGBLeft}
                                deleteDynamicSquare={deleteDynamicSquare}
                                updateGameStatus={updateGameStatus}
                                updateContraLifeStatus={updateContraLifeStatus}
                                updatePosition={this.updatePosition.bind(this)} />
                            : null;
                    })
                }
            </div>
        );
    }
}

export default EnemiesMap;