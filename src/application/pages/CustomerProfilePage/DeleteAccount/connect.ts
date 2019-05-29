import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { deleteCustomerAction } from '@stores/actions/pages/customerProfile';

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    deleteCustomerAction
}, dispatch);

export const connect = reduxify(null, mapDispatchToProps);
