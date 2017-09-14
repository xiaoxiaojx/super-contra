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
                this.getStyles = this.getStyles.bind(this);
            }
            static displayName: string = `Hoc${getDisplayName(Component)}`;
            state: HocSquareState = {
                styles: this.getStyles(options)
            };

            getStyles(parm: StaticSquareOption, top: number = 0): React.CSSProperties {
                return Object.assign({}, getImageStyles(parm), {top});
            }
            changeBackground(parm: StaticSquareOption): void {
                const styles = this.getStyles(parm);
                this.setState({ styles });
            }
            toTopAnimate() {
                const styles = this.getStyles(options, 8);
                this.setState({ styles }, () => {
                    setTimeout(() => {
                        this.setState({
                            styles: this.getStyles(options, 0)
                        });
                    }, 200);
                });
            }
            render() {
                const { styles } = this.state;
                const passThroughProps: any = this.props;
                const staticProps: WrappedStaticSquareUtils = {
                    changeBackground: this.changeBackground,
                    toTopAnimate: this.toTopAnimate
                };

                return (
                    <div className="hocWrap" style={styles}>
                        <Component
                            hocProps={staticProps}
                            {...passThroughProps}/>
                    </div>
                );
            }
        };
}

export default WithStaticSquare;