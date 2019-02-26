import * as React from 'react';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Sticky, StickyChildArgs } from 'react-sticky';
import debounce from 'lodash/debounce';
import { pathCheckoutPage } from '@constants/routes';
import withStyles from '@material-ui/core/styles/withStyles';
import CatalogSearch from '@application/containers/CatalogSearch';
import { AppLogo } from '@application/components/AppLogo';
import { MainNavigation } from '@application/components/MainNavigation';
import { AdditionalNavigation } from './AdditionalNavigation';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { SprykerLogoWhite } from './SprykerLogoWhite';
import { IAppHeaderProps as Props, IAppHeaderState as State } from './types';
import { styles } from './styles';

@(withRouter as Function)
export class AppHeaderComponent extends React.PureComponent<Props, State> {
    public readonly state: State = {
        showSearch: true,
        stickyTriggerOffset: 0,
        pageWidth: 0,
        pageHeight: 0
    };

    protected stickyTriggerRef: React.RefObject<HTMLDivElement> = React.createRef();

    public componentDidMount = (): void => {
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('scroll', this.onWindowScroll);
    }

    public componentDidUpdate = (): void => {
        this.onWindowResize();
    }

    public componentWillUnmount = (): void => {
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener('scroll', this.onWindowScroll);
        this.stickyTriggerRef = null;
    }

    protected onWindowResize = debounce((): void => {
        this.setTriggerOffset();
        this.updateWindowDimensions();
    }, 0.3);

    protected onWindowScroll = debounce((): void => {
        const {showSearch, stickyTriggerOffset} = this.state;
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (showSearch && scrollPosition > stickyTriggerOffset) {
            this.setState({showSearch: false});
        }
    }, 0.3);

    protected updateWindowDimensions = (): void => {
        this.setState({pageWidth: window.innerWidth, pageHeight: window.innerHeight});
    };

    protected setTriggerOffset = (): void => {
        const stickyTriggerOffset = this.stickyTriggerRef.current.offsetTop;

        this.setState({stickyTriggerOffset});
    };

    protected handleSticky = (stickyState: StickyChildArgs): void => {
        const {stickyTriggerOffset} = this.state;
        const scrollOffset = stickyState.distanceFromTop * -1;
        const showSearch = scrollOffset < stickyTriggerOffset;

        this.setState({showSearch});
    };

    protected handleSearch = (): void => this.setState(({showSearch}) => ({showSearch: !showSearch}));

    public render(): JSX.Element {
        const {classes, isMobileNavOpened, onMobileNavToggle, locale} = this.props;
        const {stickyTriggerOffset, showSearch, pageWidth, pageHeight} = this.state;

        return (
            <Sticky topOffset={stickyTriggerOffset}>
                {(stickyState: StickyChildArgs) => {
                    const {style, isSticky, wasSticky} = stickyState;

                    if (isSticky !== wasSticky) {
                        this.handleSticky(stickyState);
                    }

                    return (
                        <div
                            style={style}
                            className={classes.headerStickyContainer}
                        >
                            <div
                                className={classes.header}
                                style={{
                                    transform: `translate3d(0, -${showSearch ? 0 : stickyTriggerOffset}px, 0)`,
                                    transition: isSticky && wasSticky ? 'transform .3s ease-in-out' : 'none'
                                }}
                            >
                                <div className={classes.headerTop}>
                                    <div className={`${classes.headerContainer} ${classes.headerTopContainer}`}>
                                        <div className={classes.logoContainer}>
                                            <AppLogo customLogo={<SprykerLogoWhite />} />
                                        </div>

                                        <div className={classes.headerSearchContainer}>
                                            <CatalogSearch id={'2'} locale={locale} />
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.headerBottom} ref={this.stickyTriggerRef}>
                                    <div className={classes.headerContainer}>
                                        <div
                                            className={
                                                `${classes.hamburger} ${
                                                    isMobileNavOpened ? classes.hamburgerOpened : ''
                                                    }`
                                            }
                                            onClick={onMobileNavToggle}
                                        >
                                            <span />
                                            <span />
                                        </div>

                                        {this.props.location.pathname.endsWith(pathCheckoutPage)
                                            ? <div className={classes.checkout}>
                                                <FormattedMessage id="word.checkout.title" />
                                            </div>
                                            : <ErrorBoundary>
                                                <MainNavigation mobileNavState={isMobileNavOpened} />
                                            </ErrorBoundary>
                                        }

                                        <AdditionalNavigation
                                            showSearch={showSearch}
                                            handleSearch={this.handleSearch}
                                            isSticky={isSticky}
                                            pageWidth={pageWidth}
                                            pageHeight={pageHeight}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Sticky>
        );
    }
}

export const AppHeader = withStyles(styles)(AppHeaderComponent);
