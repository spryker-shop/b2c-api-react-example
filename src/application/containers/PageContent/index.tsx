import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import * as React from 'react';
import { connect } from './connect';
import { addLocaleData, IntlProvider } from 'react-intl';
import { withRouter } from 'react-router';
import { Routes } from '@application/components/Routes';
import {
    pathCategoryPageBase,
    pathLoginPage,
    pathRegisterPage,
    pathSearchPage,
    pathForgotPassword,
    pathResetPassword, pathCheckoutPage
} from '@constants/routes';
import { withStyles } from '@material-ui/core';
import { AppHeader } from '@application/containers/AppHeader';
import { AppFooter } from '@application/components/AppFooter';
import { getLocaleData } from '@helpers/locale';
import { Notifications } from '@application/components/Notifications';
import { messages } from '@translation/';
import { IPageContentProps as Props, IPageContentState as State } from './types';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { styles } from './styles';

setConfig({ ErrorOverlay: () => null });

@connect
@(withRouter as Function)
class PageContentComponent extends React.Component<Props, State> {
    public readonly state: State = {
        topOffset: '',
        isPageLocked: false
    };

    public componentDidMount = (): void => {
        const accessToken: string = localStorage.getItem('accessToken');
        const expiresIn: string = localStorage.getItem('tokenExpire');
        const refreshToken: string = localStorage.getItem('refreshToken');
        const customerRef: string = localStorage.getItem('customerRef');

        if (accessToken && expiresIn && refreshToken) {
            this.props.setAuth({
                accessToken,
                expiresIn,
                refreshToken,
                customerRef
            });
        }

        if (!this.props.isAppDataSet) {
            this.props.initApplicationData(null);

            return;
        }
    };

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        const { isAppDataSet, isPageLocked } = this.props;
        this.clearFlyoutSearchHandler(prevProps);

        if (!prevProps.isAppDataSet && isAppDataSet) {
            if (this.props.isCustomerAuth) {
                this.props.getCustomerCart();
            } else {
                this.props.getGuestCart(this.props.anonymId);
            }
        }

        if (prevProps.isPageLocked !== isPageLocked) {
            this.lockPage();
        }
    };

    protected lockPage = (): void => {
        const { classes, isPageLocked } = this.props;
        const { topOffset } = this.state;
        const topOffsetValue = isPageLocked ? window.pageYOffset : '';
        this.setState({ topOffset: topOffsetValue, isPageLocked });

        if (!isPageLocked) {
            document.body.classList.remove(classes.lockedPage);
            document.body.style.cssText = 'top: "";';

            window.scrollTo(0, Number(topOffset));

            return;
        }

        document.body.classList.add(classes.lockedPage);
        document.body.style.cssText = `top: ${-topOffsetValue}px`;
    };

    protected clearFlyoutSearchHandler = (prevProps: Props): void => {
        if (this.props.location.pathname !== prevProps.location.pathname
            && this.props.location.pathname.includes(pathCategoryPageBase) === false
            && this.props.location.pathname.includes(pathSearchPage) === false
        ) {
            this.props.clearSearchTerm();
        }
    };

    protected isDataFulfilled = () => (
        Boolean(this.props.cartCreated && this.props.isInitStateFulfilled)
    );

    protected shouldHideFooter = (): boolean => {
        const forbiddenPaths = [
            pathLoginPage,
            pathRegisterPage,
            pathResetPassword,
            pathForgotPassword,
            pathCheckoutPage
        ];
        const currentLocation = this.props.location.pathname;

        return forbiddenPaths.some(path => currentLocation.includes(path));
    };

    public render(): JSX.Element {
        const { locale, classes } = this.props;
        addLocaleData(getLocaleData(locale));

        return (
            <IntlProvider locale={ locale } messages={ messages[locale] }>
                <div className={ classes.root }>
                    <AppHeader />
                    <ErrorBoundary>
                        <Routes isAppLoading={ this.isDataFulfilled() } />
                    </ErrorBoundary>
                    { !this.shouldHideFooter() && <AppFooter /> }
                    <Notifications />
                </div>
            </IntlProvider>
        );
    }
}

const PageContent = withStyles(styles)(PageContentComponent);
export default PageContent;
