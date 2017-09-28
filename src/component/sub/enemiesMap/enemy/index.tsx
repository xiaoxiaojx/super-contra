import * as React from "react";
import Mushroom from "../mushroom";
import GrowUpMushroom from "../growUpMushroom";
import {
    NormalEnemyProps as EnemyProps
} from "../../../../common/constant";


class Enemy extends React.Component<EnemyProps, {}> {
    render() {
        const {
            index,
            dynamicData,
            inGameGBLeft,
            updatePosition,
            deleteDynamicSquare,
            contraInfo,
            updateContraLifeStatus
        } = this.props;
        const {
            type
        } = dynamicData;
        return (
            <div>
                {
                    type === 0 &&
                    <Mushroom
                        index={index}
                        key={`Mushroom-${index}`}
                        dynamicData={dynamicData}
                        contraInfo={contraInfo}
                        updatePosition={updatePosition}
                        updateContraLifeStatus={updateContraLifeStatus}
                        inGameGBLeft={inGameGBLeft}
                        deleteDynamicSquare={deleteDynamicSquare} />
                }
                {
                    type === 1 &&
                    <GrowUpMushroom
                        index={index}
                        key={`Mushroom-${index}`}
                        dynamicData={dynamicData}
                        contraInfo={contraInfo}
                        updatePosition={updatePosition}
                        updateContraLifeStatus={updateContraLifeStatus}
                        inGameGBLeft={inGameGBLeft}
                        deleteDynamicSquare={deleteDynamicSquare} />
                }
            </div>
        );
    }
}

export default Enemy;