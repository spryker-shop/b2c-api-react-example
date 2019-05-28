import * as React from 'react';
import { connect } from './connect';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import debounce from 'lodash/debounce';
import { pathCheckoutPage } from '@constants/routes';
import withStyles from '@material-ui/core/styles/withStyles';
import { Logo } from '@components/Logo';
import { MainNavigation } from '@containers/MainNavigation';
import { AdditionalNavigation } from './AdditionalNavigation';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { IHeaderProps as Props, IHeaderState as State } from './types';
import { styles } from './styles';
import { BurgerIcon, PhoneIcon } from './icons';
import { Hidden } from '@material-ui/core';

@connect
@(withRouter as Function)
class HeaderComponent extends React.PureComponent<Props, State> {
    protected stickyTriggerRef: React.RefObject<HTMLDivElement> = React.createRef();

    public readonly state: State = {
        headerHeight: 0,
        isMobileNavOpened: false
    };

    public componentDidMount = (): void => {
        this.setHeaderHeight();
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('orientationchange', this.onWindowResize);
    };

    public componentDidUpdate = (): void => {
        this.onWindowResize();
    };

    public componentWillUnmount = (): void => {
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener('orientationchange', this.onWindowResize);
    };

    protected onWindowResize = debounce((): void => {
        this.setHeaderHeight();
    }, 0.3);

    protected setHeaderHeight = (): void => {
        const headerHeight = Boolean(this.stickyTriggerRef) ? this.stickyTriggerRef.current.clientHeight : 0;

        this.setState({ headerHeight });
    };

    protected mobileNavToggleHandler = (isMobileNavOpened: boolean): void => {
        const { isPageLockedFulfilledState } = this.props;

        this.setState({ isMobileNavOpened });
        isPageLockedFulfilledState(isMobileNavOpened);
    };

    public render(): JSX.Element {
        const { classes, location: { pathname } } = this.props;
        const { headerHeight, isMobileNavOpened } = this.state;
        const isCheckoutPage = pathname.includes(pathCheckoutPage);

        return (
            <div className={ classes.header } style={ { paddingTop: headerHeight } }>
                <div className={ classes.content } ref={ this.stickyTriggerRef }>
                    <div className={ classes.container }>
                        { !isCheckoutPage &&
                            < div
                                className={ classes.hamburger }
                                onClick={ () => this.mobileNavToggleHandler(!isMobileNavOpened) }
                                >
                                <span className={ classes.hamburgerIcon }>
                                    <BurgerIcon />
                                </span>
                            </div>
                        }

                        <div className={ classes.logoCol }>
                            <Logo addlLogoWithoutImage classes={{ logoContainer: classes.logoContainer }} />
                        </div>

                        { !isCheckoutPage &&
                            <>
                                 <div className={ classes.mainNav }>
                                    <ErrorBoundary>
                                        <MainNavigation
                                            headerHeight={ headerHeight }
                                            onMobileNavToggle={ this.mobileNavToggleHandler }
                                            isMobileNavOpened={ isMobileNavOpened }
                                        />
                                    </ErrorBoundary>
                                </div>
                                <AdditionalNavigation />
                            </>
                        }

                        { isCheckoutPage &&
                            <div className={ classes.checkout }>
                                <span className={ classes.checkoutIcon }>
                                    <PhoneIcon />
                                </span>
                                <Hidden only={['xs', 'sm']} implementation="css">
                                    <FormattedMessage id={ 'word.question.title' } />
                                </Hidden>
                                <a className={ classes.checkoutPhone } href="tel:+4930208498350">
                                    +49 / 30 / 2084983 50
                                </a>
                                <FormattedMessage id={ 'schedule.title' } />
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export const Header = withStyles(styles)(HeaderComponent);
