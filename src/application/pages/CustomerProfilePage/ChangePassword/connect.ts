import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { ICustomerProfilePassword } from '@interfaces/customer';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { updateCustomerPasswordAction } from '@stores/actions/pages/customerProfile';
import { getCustomerProfile, isCustomerPasswordUpdated } from '@stores/reducers/pages/customerProfile';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const customerData = getCustomerProfile(state, ownProps);
    const passwordUpdated = isCustomerPasswordUpdated(state, ownProps);

    return ({
        customerData,
        passwordUpdated
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            updateCustomerPassword: (
                customerReference: string, payload: ICustomerProfilePassword
            ) => updateCustomerPasswordAction(customerReference, payload)
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
