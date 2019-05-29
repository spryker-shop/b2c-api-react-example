import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { ICustomerDataParsed } from '@interfaces/customer';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { updateCustomerProfileAction } from '@stores/actions/pages/customerProfile';
import { getCustomerProfile } from '@stores/reducers/pages/customerProfile';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const customerData: ICustomerDataParsed | null = getCustomerProfile(state, ownProps);

    return {
        customerData
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    updateCustomerProfileAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
