import * as React from 'react';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import debounce from 'lodash/debounce';
import { pathCheckoutPage } from '@constants/routes';
import withStyles from '@material-ui/core/styles/withStyles';
import { AppLogo } from '@application/components/AppLogo';
import { MainNavigation } from '@application/containers/MainNavigation';
import { AdditionalNavigation } from './AdditionalNavigation';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { IAppHeaderProps as Props, IAppHeaderState as State } from './types';
import { styles } from './styles';

@(withRouter as Function)
class AppHeaderComponent extends React.PureComponent<Props, State> {
    public readonly state: State = {
        headerHeight: 0
    };

    protected stickyTriggerRef: React.RefObject<HTMLDivElement> = React.createRef();

    public componentDidMount = (): void => {
        window.addEventListener('resize', this.onWindowResize);
    };

    public componentDidUpdate = (): void => {
        this.onWindowResize();
    };

    public componentWillUnmount = (): void => {
        window.removeEventListener('resize', this.onWindowResize);
    };

    protected onWindowResize = debounce((): void => {
        this.setHeaderHeight();
    }, 0.3);

    protected setHeaderHeight = (): void => {
        const headerHeight = Boolean(this.stickyTriggerRef) ? this.stickyTriggerRef.current.clientHeight : 0;

        this.setState({ headerHeight });
    };

    public render(): JSX.Element {
        const { classes, isMobileNavOpened, onMobileNavToggle, locale } = this.props;
        const { headerHeight } = this.state;
        const mainNavigation = locale &&
            <ErrorBoundary>
                <MainNavigation mobileNavState={ isMobileNavOpened } />
            </ErrorBoundary>;

        return (
            <div className={ classes.header } style={ { paddingTop: headerHeight } }>
                <div className={ classes.content } ref={ this.stickyTriggerRef }>
                    <div className={ classes.container }>
                        <div
                            className={ `${classes.hamburger} ${isMobileNavOpened ? classes.hamburgerOpened : ''}` }
                            onClick={ onMobileNavToggle }
                        >
                            <span />
                            <span />
                        </div>

                        <div className={ classes.navigationWrapper }>
                            <div className={ classes.logoContainer }>
                                <AppLogo />
                            </div>

                            { this.props.location.pathname.endsWith(pathCheckoutPage)
                                ? <div className={ classes.checkout }>
                                    <FormattedMessage id="word.checkout.title" />
                                </div>
                                : <div className={ classes.mainNav }>{ mainNavigation }</div>
                            }
                        </div>
                        <AdditionalNavigation />
                    </div>
                </div>
            </div>
        );
    }
}

export const AppHeader = withStyles(styles)(AppHeaderComponent);
