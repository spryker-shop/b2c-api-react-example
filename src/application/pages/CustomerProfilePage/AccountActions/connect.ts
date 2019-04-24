import { bindActionCreators, Dispatch } from 'redux';
import { TCustomerReference } from '@interfaces/customer';

import { reduxify } from '@hoc/Reduxify';

import { deleteCustomerAction } from '@stores/actions/pages/customerProfile';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            deleteCustomerEntity: (customerReference: TCustomerReference) => deleteCustomerAction(customerReference),
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
