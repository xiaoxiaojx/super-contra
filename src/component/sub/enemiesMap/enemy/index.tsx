import * as React from "react";
import Mushroom from "../mushroom";
import GrowUpMushroom from "../growUpMushroom";
import {
    NormalEnemyProps as EnemyProps
} from "../../../../common/constant";


class Enemy extends React.Component<EnemyProps, {}> {
    render() {
        const {
            dynamicData,
        } = this.props;
        const {
            type
        } = dynamicData;
        return (
            <div>
                {
                    type === 0 &&
                    <Mushroom
                        {...this.props} />
                }
                {
                    type === 1 &&
                    <GrowUpMushroom
                        {...this.props} />
                }
            </div>
        );
    }
}

export default Enemy;