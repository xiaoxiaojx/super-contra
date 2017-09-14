import * as React from "react";
import {
    getDisplayName,
    getImageStyles
} from "../util";
import "./index.scss";

interface WrappedStaticSquareUtils {
    changeBackground: (parm: StaticSquareOption) => void;
    toTopAnimate: () => void;
}

export interface StaticSquareOption {
    imageName?: string;
    position?: string;
}

export interface StaticSquareProps {
    hocProps: WrappedStaticSquareUtils;
}

interface HocSquareState {
    styles: React.CSSProperties;
    className: string;
}

interface ComponentDecorator<TOwnProps> {
    (component: React.ComponentClass<StaticSquareProps & TOwnProps>): React.ComponentClass<TOwnProps>;
}

function WithStaticSquare<TOwnProps>(options: StaticSquareOption): ComponentDecorator<TOwnProps> {
    return Component =>
        class HocSquare extends React.Component<TOwnProps, HocSquareState> {
            constructor(props) {
                super(props);

                this.changeBackground = this.changeBackground.bind(this);
                this.toTopAnimate = this.toTopAnimate.bind(this);
                this.setState = this.setState.bind(this);
                this.setStyles = this.setStyles.bind(this);
                this.setClassName = this.setClassName.bind(this);
            }
            static displayName: string = `Hoc${getDisplayName(Component)}`;
            initClassTimeOut: any;

            state: HocSquareState = {
                styles: getImageStyles(options),
                className: ""
            };

            componentWillUnmount() {
                this.destroy();
            }
            destroy() {
                this.clearInitClassTimeout();
            }
            setStyles(parm: StaticSquareOption) {
                this.setState({
                    styles: getImageStyles(parm)
                });
            }
            setClassName(parm: string) {
                this.setState({ className: parm }, () => {
                    this.clearInitClassTimeout();
                    this.initClassTimeOut = setTimeout(() => {
                        this.setClassName("hocWrap");
                    }, 1000);
                });
            }
            clearInitClassTimeout() {
                if (this.initClassTimeOut) {
                    clearTimeout(this.initClassTimeOut);
                    this.initClassTimeOut = 0;
                }
            }
            changeBackground(parm: StaticSquareOption): void {
                this.setStyles(parm);
            }
            toTopAnimate() {
                this.setClassName("toTopAnimate");
            }
            render() {
                const { styles, className } = this.state;
                const passThroughProps: any = this.props;
                const classNames = className ? `hocWrap ${className}` : "hocWrap";


                const staticProps: WrappedStaticSquareUtils = {
                    changeBackground: this.changeBackground,
                    toTopAnimate: this.toTopAnimate
                };

                return (
                    <div
                        className={classNames}
                        style={styles}>
                        <Component
                            hocProps={staticProps}
                            {...passThroughProps}/>
                    </div>
                );
            }
        };
}

export default WithStaticSquare;