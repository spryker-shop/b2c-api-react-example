import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';

import { ICustomerProfileIdentity, TCustomerReference } from '@interfaces/customer';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { updateCustomerProfileAction } from '@stores/actions/pages/customerProfile';
import { getCustomerProfile } from '@stores/reducers/pages/customerProfile';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const customerData = getCustomerProfile(state, ownProps);

    return ({
        customerData
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            updateCustomerData: (
                customerReference: TCustomerReference, payload: ICustomerProfileIdentity
            ) => updateCustomerProfileAction(customerReference, payload)
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
