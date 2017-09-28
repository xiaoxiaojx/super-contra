import * as React from "react";
import {
    StaticSquareStatusType
} from "../../../../common/constant";
import {
    WithStaticSquare,
    StaticSquareProps,
    StaticSquareOption
} from "../../HOC";

interface MushWallProps {
    status: StaticSquareStatusType;
}

class MushWall extends React.Component< MushWallProps & StaticSquareProps , {}> {
    componentWillReceiveProps(nextProps) {
        if ( nextProps.status === 1 && this.props.status !== nextProps.status ) {
            this.props.hoc.changeBackground({
                position: "-64px -288px",
                imageName: "base.png"
            });
        }
    }
    render() {
        return (
            <div className="mushWallWrap">
            </div>
        );
    }
}

const defaultOption: StaticSquareOption = {
    imageName: "wen.gif"
};

const MushWallWrap = WithStaticSquare<MushWallProps>(defaultOption)(MushWall);

export default MushWallWrap;
