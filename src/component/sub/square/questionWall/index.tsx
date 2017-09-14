import * as React from "react";
import {
    StaticSquareStatusType
} from "../../../../common/constant";
import {
    WithStaticSquare,
    StaticSquareProps,
    StaticSquareOption
} from "../../HOC";
import "./index.scss";

interface QuestionWallProps {
    status: StaticSquareStatusType;
}

class QuestionWall extends React.Component< QuestionWallProps & StaticSquareProps , {}> {
    componentWillReceiveProps(nextProps) {
        if ( this.props.status !== nextProps.status ) {
            this.props.hocProps.toTopAnimate();
        }
    }

    render() {
        return (
            <div className="normalFloorWrap">
            </div>
        );
    }
}

const defaultOption: StaticSquareOption = {
    imageName: "wen.gif"
};

const QuestionWallWrap = WithStaticSquare<QuestionWallProps>(defaultOption)(QuestionWall);

export default QuestionWallWrap;
