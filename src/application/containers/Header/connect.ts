import { bindActionCreators, Dispatch } from 'redux';
import { isPageLockedFulfilledState } from '@stores/actions/common/init';
import { reduxify } from '@hoc/Reduxify';

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    isPageLockedFulfilledState
}, dispatch);

export const connect = reduxify(null, mapDispatchToProps);
