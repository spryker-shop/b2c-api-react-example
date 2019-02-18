import * as React from 'react';
import { StickyContainer } from 'react-sticky';
import { addLocaleData, IntlProvider } from 'react-intl';

import { withRouter } from 'react-router';
import { IComponent } from 'src/typings/app';
import { getContentRoutes, pathCategoryPageBase, pathSearchPage } from 'src/shared/routes/contentRoutes';
import { AppHeader } from 'src/shared/components/Common/AppHeader';
import { AppFooter } from 'src/shared/components/Common/AppFooter';
import { isStateLoading } from '@stores/reducers';
import { reduxify } from 'src/shared/lib/redux-helper';
import {
    getAnonymId, getAppLocale, isAppInitiated, isAppStateFulfilled
} from '@stores/reducers/common/init';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getLocaleData } from 'src/shared/helpers/locale';
import {
    initApplicationDataAction,
    setAuthFromStorageAction,
    IInitApplicationDataPayload
} from '@stores/actions/common/init';
import { getCustomerCartsAction, getGuestCartAction } from '@stores/actions/common/cart';
import { isCartCreated } from '@stores/reducers/common/cart/selectors';
import { clearSearchTermAction } from '@stores/actions/pages/search';
import { WithRouter } from 'src/shared/interfaces/common/react';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { TAppLocale } from 'src/shared/interfaces/locale';
import { ICustomerLoginDataParsed } from 'src/shared/interfaces/customer/index';
import { Notifications } from 'src/shared/components/Common/Notifications';
import { messages } from 'src/shared/translation/index';

const styles = require('./style.scss');
const className = styles.pageContent;

interface PageContentProps extends IComponent, WithRouter {
    dispatch: Function;
    isLoading: boolean;
    locale: TAppLocale;
    initApplicationData: Function;
    setAuth: Function;
    getCustomerCart: Function;
    getGuestCart: Function;
    isAppDataSet: boolean;
    isCustomerAuth: boolean;
    anonymId: string;
    cartCreated: boolean;
    isInitStateFulfilled: boolean;
    clearSearchTerm: () => void;
}

interface PageContentState {
    mobileNavOpened: boolean;
}

@(withRouter as any)
export class PageContentBase extends React.Component<PageContentProps, PageContentState> {
    public state: PageContentState = {
        mobileNavOpened: false
    };

    public componentDidMount() {
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

        const css = `
        @font-face {
          font-family: 'Circular';
          font-style: normal;
          font-weight: 500;
          src: url('https://s3.eu-central-1.amazonaws.com/spryker/fonts/circular-pro/lineto-circular-pro-medium.woff2')
               format('woff2');
        }`;
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');

        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));

        head.appendChild(style);

        if (!this.props.isAppDataSet) {
            this.props.initApplicationData(null);

            return;
        }

    }

    public componentDidUpdate(prevProps: PageContentProps, prevState: PageContentState) {
        this.clearFlyoutSearchHandler(prevProps);

        if (!prevProps.isAppDataSet && this.props.isAppDataSet) {
            if (this.props.isCustomerAuth) {
                this.props.getCustomerCart();
            } else {
                this.props.getGuestCart(this.props.anonymId);
            }
        }
    }

    private clearFlyoutSearchHandler = (prevProps: PageContentProps): void => {
        if (this.props.location.pathname !== prevProps.location.pathname
            && this.props.location.pathname.includes(pathCategoryPageBase) === false
            && this.props.location.pathname.includes(pathSearchPage) === false
        ) {
            this.props.clearSearchTerm();
        }
    };

    private isDataFulfilled = () => (
        Boolean(this.props.cartCreated && this.props.isInitStateFulfilled)
    );

    private mobileNavToggle = () => this.setState(({ mobileNavOpened }) => ({ mobileNavOpened: !mobileNavOpened }));

    public render(): JSX.Element {
        const { isLoading, locale } = this.props;
        const { mobileNavOpened } = this.state;
        addLocaleData(getLocaleData(locale));

        return (
            <IntlProvider locale={ locale } messages={ messages[locale] }>
                <div className={ className }>
                    <StickyContainer>
                        <AppHeader
                            isLoading={ isLoading }
                            onMobileNavToggle={ this.mobileNavToggle }
                            isMobileNavOpened={ mobileNavOpened }
                        />
                        { getContentRoutes(this.isDataFulfilled()) }
                        <Notifications />
                        <AppFooter />
                    </StickyContainer>
                </div>
            </IntlProvider>
        );
    }
}

export const PageContent = reduxify(
    (state: IReduxStore, ownProps: IReduxOwnProps) => {
        const isLoading = isStateLoading(state, ownProps) || false;
        const locale = getAppLocale(state, ownProps);
        const isAppDataSet: boolean = isAppInitiated(state, ownProps);
        const isCustomerAuth: boolean = isUserAuthenticated(state, ownProps);
        const anonymId = getAnonymId(state, ownProps);
        const cartCreated: boolean = isCartCreated(state, ownProps);
        const isInitStateFulfilled: boolean = isAppStateFulfilled(state, ownProps);

        return ({
            isLoading,
            locale,
            isAppDataSet,
            isCustomerAuth,
            anonymId,
            cartCreated,
            isInitStateFulfilled
        });
    },
    (dispatch: Function) => ({
        dispatch,
        initApplicationData: (payload: IInitApplicationDataPayload) => dispatch(initApplicationDataAction(payload)),
        setAuth: (payload: ICustomerLoginDataParsed) => dispatch(setAuthFromStorageAction(payload)),
        getCustomerCart: () => dispatch(getCustomerCartsAction()),
        getGuestCart: (anonymId: string) => dispatch(getGuestCartAction(anonymId)),
        clearSearchTerm: () => dispatch(clearSearchTermAction())
    })
)(PageContentBase);
