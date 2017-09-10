import * as React from "react";
import {
    WithStaticSquare,
    StaticSquareProps,
    StaticSquareOption
} from "../../HOC";

interface CheeseHeadRightProps {
}

class CheeseHeadRight extends React.Component< CheeseHeadRightProps & StaticSquareProps , {}> {
    render() {
        return (
            <div>
            </div>
        );
    }
}

const defaultOption: StaticSquareOption = {
    imageName: "base.png",
    position: "-32px -288px"
};

const CheeseHeadRightWrap = WithStaticSquare<CheeseHeadRightProps>(defaultOption)(CheeseHeadRight);

export default CheeseHeadRightWrap;
