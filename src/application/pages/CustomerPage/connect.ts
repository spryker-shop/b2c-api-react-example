import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { clearOrdersCollectionAction } from '@stores/actions/pages/order';
import { clearAddressAction } from '@stores/actions/pages/addresses';

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            clearAddressAction,
            clearOrdersCollectionAction
        },
        dispatch,
    );

export const connect = reduxify(null, mapDispatchToProps);
