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

@(withRouter as Function)
export class AppHeaderComponent extends React.PureComponent<Props, State> {
    public readonly state: State = {
        showSearch: true,
        headerHeight: 0,
        pageWidth: 0,
        pageHeight: 0
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
        this.stickyTriggerRef = null;
    };

    protected onWindowResize = debounce((): void => {
        this.setHeaderHeight();
        this.updateWindowDimensions();
    }, 0.3);

    protected updateWindowDimensions = (): void => {
        this.setState({ pageWidth: window.innerWidth, pageHeight: window.innerHeight });
    };

    protected setHeaderHeight = (): void => {
        const headerHeight = this.stickyTriggerRef.current.clientHeight;

        this.setState({ headerHeight });
    };

    protected handleSearch = (): void => this.setState(({ showSearch }) => ({ showSearch: !showSearch }));

    public render(): JSX.Element {
        const { classes, isMobileNavOpened, onMobileNavToggle } = this.props;
        const { headerHeight, showSearch, pageWidth, pageHeight } = this.state;

        return (
            <div className={ classes.header } style={ { paddingTop: headerHeight } }>

                { /*<div className={ classes.headerTop }>*/ }
                { /*<div className={ `${classes.headerContainer} ${classes.headerTopContainer}` }>*/ }
                { /*<div className={ classes.headerSearchContainer }>*/ }
                { /*<CatalogSearch id={ '2' } locale={ locale } />*/ }
                { /*</div>*/ }
                { /*</div>*/ }
                { /*</div>*/ }

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

                        <AdditionalNavigation
                            showSearch={ showSearch }
                            handleSearch={ this.handleSearch }
                            isSticky={ true }
                            pageWidth={ pageWidth }
                            pageHeight={ pageHeight }
                            headerHeight={ headerHeight }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export const AppHeader = withStyles(styles)(AppHeaderComponent);
