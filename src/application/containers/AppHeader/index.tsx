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
import { BurgerLogo } from './icons';

@(withRouter as Function)
class AppHeaderComponent extends React.PureComponent<Props, State> {
    protected stickyTriggerRef: React.RefObject<HTMLDivElement> = React.createRef();

    public readonly state: State = {
        headerHeight: 0,
        isMobileNavOpened: false
    };

    public componentDidMount = (): void => {
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

    protected mobileNavToggleHandler = () =>
        this.setState(({ isMobileNavOpened }) => ({ isMobileNavOpened: !isMobileNavOpened }));

    public render(): JSX.Element {
        const { classes } = this.props;
        const { headerHeight, isMobileNavOpened } = this.state;

        return (
            <div className={ classes.header } style={ { paddingTop: headerHeight } }>
                <div className={ classes.content } ref={ this.stickyTriggerRef }>
                    <div className={ classes.container }>
                        <div className={ classes.hamburger }>
                            <BurgerLogo />
                        </div>

                        <div className={ classes.logoCol }>
                            <AppLogo addlLogoWithoutImage classes={{ logoContainer: classes.logoContainer }} />
                        </div>

                        { this.props.location.pathname.endsWith(pathCheckoutPage)
                            ? <div className={ classes.checkout }>
                                <FormattedMessage id="word.checkout.title" />
                            </div>
                            : <div className={ classes.mainNav }>
                                <ErrorBoundary>
                                    <MainNavigation
                                        onMobileNavToggle={ this.mobileNavToggleHandler }
                                        isMobileNavOpened={ isMobileNavOpened }
                                    />
                                </ErrorBoundary>
                            </div>
                        }

                        <AdditionalNavigation />
                    </div>
                </div>
            </div>
        );
    }
}

export const AppHeader = withStyles(styles)(AppHeaderComponent);
