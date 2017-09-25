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

interface MushroomProps {
    index: number;
    status: DynamicSquareStatusType;
    toward: TowardType;
    position: PositionType;
    updatePosition: (position: PositionType, index: number) => void;
}

class Mushroom extends React.Component<MushroomProps & DynamicSquareProps, {}> {
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

const MushroomWrap = WithDynamicSquare<MushroomProps>(defaultOption)(Mushroom);

export default MushroomWrap;