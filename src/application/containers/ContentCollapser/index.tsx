import * as React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { ContentCollapserProps as Props, ContentCollapserState as State } from './types';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';
import debounce from 'lodash/debounce';
import { resolutionChecker } from '@helpers/common/resolutionChecker';

class ContentCollapserComponent extends React.Component<Props, State> {
    protected contentRef: React.RefObject<HTMLDivElement> = React.createRef();

    public static defaultProps = {
        maxHeight: 370,
    };

    public readonly state: State = {
        isOpen: false,
        shouldLimit: false
    };

    public componentDidMount = (): void => {
        this.limitBlock();
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('orientationchange', this.onWindowResize);
    };

    public componentWillUnmount = (): void => {
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener('orientationchange', this.onWindowResize);
    };

    protected onWindowResize = debounce((): void => {
        this.setState({ shouldLimit: false });
        this.limitBlock();
    }, 0.3);

    protected limitBlock = (): void => {
        const { maxHeight } = this.props;
        const { isOpen } = this.state;
        const contentHeight = Boolean(this.contentRef) ? this.contentRef.current.clientHeight : 0;
        const isMobile = resolutionChecker(window.innerWidth, 'sm');
        const shouldLimit = contentHeight > maxHeight;

        if (isOpen) {
            return;
        }

        if (!isMobile) {
            this.setState({ shouldLimit: false });

            return;
        }

        this.setState({ shouldLimit });
    };

    protected onClickButtonHandler = (): void => this.setState({ isOpen: true });

    public render(): JSX.Element {
        const { isOpen, shouldLimit } = this.state;
        const { children, classes, maxHeight } = this.props;
        const isLimited = shouldLimit && !isOpen;
        const limitedValue = isLimited ? maxHeight : '';

        return (
            <>
                <div
                    style={{ maxHeight: limitedValue }}
                    ref={ this.contentRef }
                    className={ classes.content }
                >
                    { children }
                </div>
                <div className={`${classes.triggerHolder} ${isLimited ? classes.triggerHolderLimited : ''}`}>
                    <Button
                        onClick={ this.onClickButtonHandler }
                        className={ classes.button }
                        variant="outlined"
                    >
                        <FormattedMessage id={ 'view.more.title' } />
                    </Button>
                </div>
            </>
        );
    }
}

export const ContentCollapser = withStyles(styles)(ContentCollapserComponent);
