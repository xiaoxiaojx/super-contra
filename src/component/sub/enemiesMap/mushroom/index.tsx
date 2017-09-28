import * as React from "react";
import {
    WithDynamicSquare,
    DynamicSquareProps,
    DynamicSquareOption
} from "../../HOC";
import {
    NormalEnemyProps
} from "../../../../common/constant";


class Mushroom extends React.Component<NormalEnemyProps & DynamicSquareProps, {}> {
    render() {
        return (
            <div>
            </div>
        );
    }
}

const defaultOption: DynamicSquareOption = {
    imageName: "mushroom.gif",
};

const MushroomWrap = WithDynamicSquare<NormalEnemyProps>(defaultOption)(Mushroom);

export default MushroomWrap;