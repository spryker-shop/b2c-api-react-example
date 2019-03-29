import { reduxify } from '@application/hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { isStateLoading } from '@stores/reducers';
import { getAnonymId, getAppLocale, isAppInitiated, isAppStateFulfilled, getIsLockedPage } from '@stores/reducers/common/init';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { isCartCreated } from '@stores/reducers/common/cart/selectors';
import {
    IInitApplicationDataPayload,
    initApplicationDataAction,
    setAuthFromStorageAction
} from '@stores/actions/common/init';
import { ICustomerLoginDataParsed } from '@interfaces/customer';
import { getCustomerCartsAction, getGuestCartAction } from '@stores/actions/common/cart';
import { clearSearchTermAction } from '@stores/actions/pages/search';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading = isStateLoading(state, ownProps) || false;
    const locale = getAppLocale(state, ownProps);
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isCustomerAuth: boolean = isUserAuthenticated(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);
    const cartCreated: boolean = isCartCreated(state, ownProps);
    const isInitStateFulfilled: boolean = isAppStateFulfilled(state, ownProps);
    const isLockedPage: boolean = getIsLockedPage(state, ownProps);

    return ({
        isLoading,
        locale,
        isAppDataSet,
        isCustomerAuth,
        anonymId,
        cartCreated,
        isInitStateFulfilled,
        isLockedPage
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    initApplicationData: (payload: IInitApplicationDataPayload) => dispatch(initApplicationDataAction(payload)),
    setAuth: (payload: ICustomerLoginDataParsed) => dispatch(setAuthFromStorageAction(payload)),
    getCustomerCart: () => dispatch(getCustomerCartsAction()),
    getGuestCart: (anonymId: string) => dispatch(getGuestCartAction(anonymId)),
    clearSearchTerm: () => dispatch(clearSearchTermAction())
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
