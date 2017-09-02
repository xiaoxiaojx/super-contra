import * as React from "react";
import {
    getUrl
} from "./util";
import "./index.scss";

interface SquareProps {
    imgName?: string;
    width?: string;
    height?: string;
    position?: string;
}

class Square extends React.Component<SquareProps, {}> {
    static defaultProps: SquareProps = {
        imgName: "",
        width: "32px",
        height: "32px",
        position: ""
    };
    render() {
        const { imgName, width, height, position } = this.props;
        const positionStyle =
            position ?
                {
                    backgroundPosition: position
                }
            :   {};
        const style =
            imgName ?
                Object.assign({
                    width,
                    height,
                    backgroundImage: getUrl(imgName),
                }, positionStyle)
            :
                {
                    width,
                    height
                };
        return (
            <div className="squareWrap" style={style}>
            </div>
        );
    }
}

export default Square;