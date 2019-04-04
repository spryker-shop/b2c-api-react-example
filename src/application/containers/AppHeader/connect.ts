import { bindActionCreators, Dispatch } from 'redux';
import { isLockedPageFulfilledState } from '@stores/actions/common/init';
import { reduxify } from '@hoc/Reduxify';

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators(
        {
            isLockedPage: (payload: boolean) => isLockedPageFulfilledState(payload)
        },
        dispatch,
    )
);

export const connect = reduxify(null, mapDispatchToProps);
