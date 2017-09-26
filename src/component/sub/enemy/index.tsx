import * as React from "react";
import { observer } from "mobx-react";
import {
    SuperContraStore
} from "../../../store";
import {
    PositionType
} from "../../../common/constant";
import Mushroom from "./mushroom";

interface EnemyProps {
    store: SuperContraStore;
}

@observer
class Enemy extends React.Component<EnemyProps, {}> {
    updatePosition(position: PositionType, index: number): void {
        const { updateDynamicSquare } = this.props.store;
        updateDynamicSquare({position}, index);
    }
    render() {
        const { dynamicSquareMap, inGameGBLeft, deleteDynamicSquare } = this.props.store;
        return (
            <div>
                {
                    dynamicSquareMap.map((item, index) => {
                        const { position, toward, status } = item;
                        switch (item.type) {
                            case 0 :
                                return <Mushroom
                                    index={index}
                                    key={`Mushroom-${index}`}
                                    status={status}
                                    toward={toward}
                                    position={position}
                                    updatePosition={this.updatePosition.bind(this)}
                                    inGameGBLeft={inGameGBLeft}
                                    deleteDynamicSquare={deleteDynamicSquare} />;
                            default :
                                return null;
                        }
                    })
                }
            </div>
        );
    }
}

export default Enemy;