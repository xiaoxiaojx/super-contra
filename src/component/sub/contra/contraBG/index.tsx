import * as React from "react";
import {
    ContraDirectionType
} from "common/constant";
import "./index.scss";

const image = require("../../../../image/people.png");

interface ContraBGProps {
    status: ContraDirectionType;
    left: number;
    top: number;
}


class ContraBG extends React.Component<ContraBGProps, {}> {
    status: ContraDirectionType = 0;
    getDefault() {
        return {
            backgroundPosition: "-140px -19px"
        };
    }
    getToLeft() {
        return {
            backgroundPosition: "-110px -19px"
        };
    }
    getJump() {
        return {

        };
    }
    getBGStyle(): React.CSSProperties {
        const { status } = this.props;
        switch (status) {
            case 2:
                return this.getToLeft();
            case 6:
                return this.getToLeft();
            default:
                return this.getDefault();
        }
    }
    render() {
        const { left, top, children } = this.props;
        const normalStyle = { left, top, backgroundImage: `url(${image})` };
        const styles = Object.assign({}, normalStyle, this.getBGStyle());

        return (
            <div
                className="contraBGWrap"
                style={styles}>
                { children }
            </div>
        );
    }
}

export default ContraBG;