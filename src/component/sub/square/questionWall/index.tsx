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
        if ( nextProps.status === 1 && this.props.status !== nextProps.status ) {
            console.log(nextProps.status, this.props.status);
            this.props.hoc.toTopAnimate();
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
