import * as React from "react";
import {
    WithDynamicSquare,
    DynamicSquareProps,
    DynamicSquareOption
} from "../../HOC";
import {
    DynamicSquareStatusType,
    TowardType,
    PositionType
} from "../../../../common/constant";

interface GrowUpMushroomProps {
    index: number;
    status: DynamicSquareStatusType;
    toward: TowardType;
    position: PositionType;
    inGameGBLeft: number;
    updatePosition: (position: PositionType, index: number) => void;
    deleteDynamicSquare: (parm: number) => void;
}

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