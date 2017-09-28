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
class EnemiesMap extends React.PureComponent<EnemiesMapProps, {}> {
    updatePosition(position: PositionType, index: number): void {
        const { updateDynamicSquare } = this.props.store;
        updateDynamicSquare({position}, index);
    }
    render() {
        const { dynamicSquareMap, inGameGBLeft, deleteDynamicSquare, contraInfo, updateContraLifeStatus } = this.props.store;
        return (
            <div>
                {
                    dynamicSquareMap.map((item, index) => {
                        return <Enemy
                            index={index}
                            key={`Mushroom-${index}`}
                            dynamicData={item}
                            contraInfo={contraInfo}
                            inGameGBLeft={inGameGBLeft}
                            deleteDynamicSquare={deleteDynamicSquare}
                            updateContraLifeStatus={updateContraLifeStatus}
                            updatePosition={this.updatePosition.bind(this)} />;
                    })
                }
            </div>
        );
    }
}

export default EnemiesMap;