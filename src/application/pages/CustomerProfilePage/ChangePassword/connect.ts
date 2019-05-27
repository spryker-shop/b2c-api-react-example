import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { ICustomerDataParsed } from '@interfaces/customer';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { updateCustomerPasswordAction } from '@stores/actions/pages/customerProfile';
import { getCustomerProfile, isCustomerPasswordUpdated } from '@stores/reducers/pages/customerProfile';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const customerData: ICustomerDataParsed | null = getCustomerProfile(state, ownProps);
    const passwordUpdated: boolean = isCustomerPasswordUpdated(state, ownProps);

    return {
        customerData,
        passwordUpdated
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    updateCustomerPasswordAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
