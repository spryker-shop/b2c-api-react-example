import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { ICustomerDataParsed } from '@interfaces/customer';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { updateCustomerPasswordAction } from '@stores/actions/pages/customerProfile';
import {
    getCustomerProfile,
    isCustomerPasswordUpdated,
    isPageCustomerProfileLoading
} from '@stores/reducers/pages/customerProfile/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const customerData: ICustomerDataParsed = getCustomerProfile(state, ownProps);
    const isPasswordUpdated: boolean = isCustomerPasswordUpdated(state, ownProps);
    const isLoading: boolean = isPageCustomerProfileLoading(state, ownProps);

    return {
        customerData,
        isPasswordUpdated,
        isLoading
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    updateCustomerPasswordAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
