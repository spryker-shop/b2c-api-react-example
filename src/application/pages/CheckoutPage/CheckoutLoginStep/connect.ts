import { reduxify } from '@hoc/Reduxify';
import { clearCheckoutDataForm } from '@stores/actions/pages/checkout';

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    clearCheckoutDataForm: (): void => dispatch(clearCheckoutDataForm())
});

export const connect = reduxify(null, mapDispatchToProps);
