import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import * as React from 'react';
import { connect } from './connect';
import { addLocaleData, IntlProvider } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Routes } from '@components/Routes';
import {
    pathCategoryPageBase,
    pathAuthenticationPage,
    pathSearchPage,
    pathForgotPassword,
    pathResetPassword,
    pathCheckoutPage
} from '@constants/routes';
import { withStyles } from '@material-ui/core';
import { Header } from '@containers/Header';
import { Footer } from '@components/Footer';
import { getLocaleData } from '@helpers/locale';
import { Notifications } from '@components/Notifications';
import { messages } from '@translation/';
import { IPageContentProps as Props, IPageContentState as State } from './types';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
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
            this.props.setAuthFromStorageAction({
                accessToken,
                expiresIn,
                refreshToken,
                customerRef
            });
        }

        if (!this.props.isAppDataSet) {
            this.props.initApplicationDataAction(null);

            return;
        }
    };

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        const { isAppDataSet, isPageLocked, anonymId, isCustomerAuth } = this.props;
        this.clearFlyoutSearchHandler(prevProps);

        if (!prevProps.isAppDataSet && isAppDataSet) {
            this.props.getCustomerCartsAction(anonymId, isCustomerAuth);
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
            this.props.clearSearchTermAction();
        }
    };

    protected shouldHideFooter = (): boolean => {
        const forbiddenPaths = [
            pathAuthenticationPage,
            pathResetPassword,
            pathForgotPassword,
            pathCheckoutPage
        ];
        const currentLocation = this.props.location.pathname;

        return forbiddenPaths.some(path => currentLocation.includes(path));
    };

    public render(): JSX.Element {
        const { locale, classes, isCartCreated, isInitStateFulfilled } = this.props;
        const isDataFulfilled = Boolean(isCartCreated && isInitStateFulfilled);
        addLocaleData(getLocaleData(locale));

        return (
            <IntlProvider locale={ locale } messages={ messages[locale] }>
                <div className={ classes.root }>
                    <Header />
                    <ErrorBoundary>
                        <Routes isAppLoading={ isDataFulfilled } />
                    </ErrorBoundary>
                    { !this.shouldHideFooter() && <Footer /> }
                    <Notifications />
                </div>
            </IntlProvider>
        );
    }
}

const PageContent = withStyles(styles)(PageContentComponent);
export default PageContent;
