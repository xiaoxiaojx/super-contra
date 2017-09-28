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
            this.props.hoc.toTopAnimate();
            this.props.hoc.changeBackground({
                position: "-64px -288px",
                imageName: "base.png"
            });
        }
    }
    shouldComponentUpdate(nextProps) {
        return this.props.status !== nextProps.status ;
    }

    render() {
        console.log("QuestionWall update...");
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
