import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { clearCheckoutDataForm } from '@stores/actions/pages/checkout';

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    clearCheckoutDataForm
}, dispatch);

export const connect = reduxify(null, mapDispatchToProps);
