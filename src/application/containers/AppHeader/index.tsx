import * as React from 'react';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import debounce from 'lodash/debounce';
import { pathCheckoutPage } from '@constants/routes';
import withStyles from '@material-ui/core/styles/withStyles';
import { AppLogo } from '@application/components/AppLogo';
import { MainNavigation } from '@application/components/MainNavigation';
import { AdditionalNavigation } from './AdditionalNavigation';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { SprykerLogoBlack } from './icons';
import { IAppHeaderProps as Props, IAppHeaderState as State } from './types';
import { styles } from './styles';

@(withStyles(styles) as Function)
@(withRouter as Function)
export class AppHeader extends React.PureComponent<Props, State> {
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
        const headerHeight = this.stickyTriggerRef.current.clientHeight;

        this.setState({ headerHeight });
    };

    public render(): JSX.Element {
        const { classes, isMobileNavOpened, onMobileNavToggle } = this.props;
        const { headerHeight } = this.state;

        return (
            <div className={ classes.header } style={ { paddingTop: headerHeight } }>
                <div className={ classes.content } ref={ this.stickyTriggerRef }>
                    <div className={ classes.container }>
                        <div
                            className={
                                `${classes.hamburger} ${
                                    isMobileNavOpened ? classes.hamburgerOpened : ''
                                    }`
                            }
                            onClick={ onMobileNavToggle }
                        >
                            <span />
                            <span />
                        </div>

                        <div className={ classes.navigationWrapper }>
                            <div className={ classes.logoContainer }>
                                <AppLogo customLogo={ <SprykerLogoBlack /> } />
                            </div>

                            { this.props.location.pathname.endsWith(pathCheckoutPage)
                                ? <div className={ classes.checkout }>
                                    <FormattedMessage id="word.checkout.title" />
                                </div>
                                : <ErrorBoundary>
                                    <MainNavigation mobileNavState={ isMobileNavOpened } />
                                </ErrorBoundary>
                            }
                        </div>

                        <AdditionalNavigation />
                    </div>
                </div>
            </div>
        );
    }
}
