import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getRouterHistoryPush } from '@helpers/router';

import { TCustomerReference } from '@interfaces/customer';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

import {
    isCustomerProfilePresent,
    isPageCustomerProfileFulfilled,
    isPageCustomerProfileLoading,
    isPageCustomerProfileRejected,
} from '@stores/reducers/pages/customerProfile';
import { getCustomerProfileAction } from '@stores/actions/pages/customerProfile';
import { getCustomerReference } from '@stores/reducers/pages/login';
import { isAppInitiated } from '@stores/reducers/common/init/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading = isPageCustomerProfileLoading(state, ownProps);
    const isRejected = isPageCustomerProfileRejected(state, ownProps);
    const isFulfilled = isPageCustomerProfileFulfilled(state, ownProps);
    const isAppDataSet = isAppInitiated(state, ownProps);
    const isCustomerDataExist = isCustomerProfilePresent(state, ownProps);
    const customerReference = getCustomerReference(state, ownProps);
    const routerPush = getRouterHistoryPush(state, ownProps);

    return ({
        isLoading,
        isRejected,
        isFulfilled,
        isAppDataSet,
        isCustomerDataExist,
        customerReference,
        routerPush
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            getCustomerData: (customerReference: TCustomerReference) => getCustomerProfileAction(customerReference)
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
