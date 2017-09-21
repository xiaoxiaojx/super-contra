import * as React from "react";
import {
    ContraDirectionType,
    TowardType
} from "../../../../common/constant";
import "./index.scss";

interface ContraBGProps {
    status: ContraDirectionType;
    left: number;
    top: number;
    toward: TowardType;
}

interface ContraBGState {
    image: string;
}

class ContraBG extends React.PureComponent<ContraBGProps, ContraBGState> {
    constructor(props) {
        super(props);

        this.timeOutSetImage = this.timeOutSetImage.bind(this);
    }
    state: ContraBGState = {
        image: require(`../../../../image/pright.png`)
    };
    changeInterval: any;

    componentWillUnmount() {
        this.destroy();
    }
    componentWillReceiveProps(nextProps) {
        if ( nextProps.status !== this.props.status ) {
            const image = this.getImage(nextProps);
            this.timeOutSetImage(image);
        }
    }
    timeOutSetImage(parm: string | string[]) {
        this.clearChangeInterval();
        if ( typeof parm === "string" ) {
            this.setImage(parm);
        } else {
            const length = parm.length;
            let index = 0;
            this.changeInterval = setInterval(() => {
                this.setImage(parm[index]);
                if ( index < length - 1 ) {
                    index ++;
                } else {
                    index = 0;
                }
            }, 150);
        }
    }
    setImage(parm: string) {
        if ( this.state.image !==  parm) {
            this.setState({ image: parm });
        }
    }
    getStaticRight() {
        return require(`../../../../image/pright.png`);
    }
    getStaticLeft() {
        return require(`../../../../image/pleft.png`);
    }
    getToLeftTop () {
        return [
            require(`../../../../image/ptolefttop1.png`),
            require(`../../../../image/ptolefttop2.png`),
            require(`../../../../image/ptolefttop3.png`),
        ];
    }
    getToRightTop () {
        return [
            require(`../../../../image/ptorighttop1.png`),
            require(`../../../../image/ptorighttop2.png`),
            require(`../../../../image/ptorighttop3.png`),
        ];
    }
    getToRight() {
        return [
            require(`../../../../image/ptoright1.png`),
            require(`../../../../image/ptoright2.png`),
            require(`../../../../image/ptoright3.png`),
        ];
    }
    getToLeft() {
        return [
            require(`../../../../image/ptoleft1.png`),
            require(`../../../../image/ptoleft2.png`),
            require(`../../../../image/ptoleft3.png`),
        ];
    }
    getImage(nextProps: ContraBGProps): string | string[] {
        const { status, toward } = nextProps;
        switch (status) {
            case 0:
                if ( toward === 0 ) {
                    return this.getStaticLeft();
                }
                return this.getStaticRight();
            case 1:
                return this.getToRight();
            case 2:
                return this.getToLeft();
            case 4:
                if ( toward === 0 ) {
                    return this.getStaticLeft();
                }
                return this.getStaticRight();
            case 5:
                return this.getToRightTop();
            case 6:
                return this.getToLeftTop();
            default:
                return this.getStaticRight();
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
        const { image } = this.state;
        const styles = {
            left,
            top,
            backgroundImage: `url(${image})`
        };

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