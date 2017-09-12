import * as React from "react";
import {
    ContraDirectionType,
    TowardType
} from "common/constant";
import "./index.scss";

const image = require("../../../../image/people.png");

interface ContraBGProps {
    status: ContraDirectionType;
    left: number;
    top: number;
    toward: TowardType;
}

interface ContraBGState {
    position: string;
}

const toRightBGItems = [
    "-140px -19px",
    "-138px -133px",
    "-187px -133px"
];

const toLeftBGItems = [
    "-110px -19px",
    "-112px -133px",
    "-63px -136px"
];

class ContraBG extends React.Component<ContraBGProps, ContraBGState> {
    constructor(props) {
        super(props);

        this.timeOutSetPosition = this.timeOutSetPosition.bind(this);
    }
    state:  ContraBGState = {
        position: "-140px -19px"
    };
    changeInterval: any;

    componentWillUnmount() {
        this.destroy();
    }
    componentWillReceiveProps(nextProps) {
        if ( nextProps.status !== this.props.status ) {
            const position = this.getPosition(nextProps);
            this.timeOutSetPosition(position);
        }
    }
    timeOutSetPosition(parm: string | string[]) {
        this.clearChangeInterval();
        if ( typeof parm === "string" ) {
            this.setPosition(parm);
        } else {
            const length = parm.length;
            let index = 0;
            this.changeInterval = setInterval(() => {
                this.setPosition(parm[index]);
                if ( index < length - 1 ) {
                    index ++;
                } else {
                    index = 0;
                }
            }, 100);
        }
    }
    setPosition(parm: string) {
        if ( this.state.position !==  parm) {
            this.setState({ position: parm });
        }
    }
    getDefault() {
        return "-140px -19px";
    }
    getStaticLeft() {
        return "-110px -19px";
    }
    getToRight() {
        return toRightBGItems;
    }
    getToLeft() {
        return toLeftBGItems;
    }
    getPosition(nextProps: ContraBGProps): string | string[] {
        const { status, toward } = nextProps;
        switch (status) {
            case 0:
                if ( toward === 0 ) {
                    return this.getStaticLeft();
                }
                return this.getDefault();
            case 1:
                return this.getToRight();
            case 2:
                return this.getToLeft();
            case 4:
                if ( toward === 0 ) {
                    return this.getStaticLeft();
                }
                return this.getDefault();
            case 6:
                return this.getStaticLeft();
            default:
                return this.getDefault();
        }
    }
    destroy() {
        this.clearChangeInterval();
    }
    clearChangeInterval() {
        if ( this.changeInterval ) {
            clearInterval(this.changeInterval);
            this.changeInterval = 0;
        }
    }
    render() {
        const { left, top, children } = this.props;
        const { position } = this.state;
        const normalStyle = {
            left,
            top,
            backgroundImage: `url(${image})` };
        const positionStyle = {
            backgroundPosition: position
        };
        const styles = Object.assign({}, normalStyle, positionStyle);

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