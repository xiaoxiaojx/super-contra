import * as React from "react";
import {
    WithDynamicSquare,
    DynamicSquareProps,
    DynamicSquareOption
} from "../../HOC";
import {
    NormalEnemyProps as GrowUpMushroomProps
} from "../../../../common/constant";

class GrowUpMushroom extends React.Component<GrowUpMushroomProps & DynamicSquareProps, {}> {
    componentDidMount() {
        const { startBirthAnimate } = this.props.hoc;
        startBirthAnimate();
    }
    render() {
        return (
            <div>
            </div>
        );
    }
}

const defaultOption: DynamicSquareOption = {
    imageName: "base.png",
    position: "0 -224px"
};

const GrowUpMushroomWrap = WithDynamicSquare<GrowUpMushroomProps>(defaultOption)(GrowUpMushroom);

export default GrowUpMushroomWrap;