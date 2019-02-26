import { reduxify } from '@application/hoc/Reduxify';

import { ICartTotals } from '@interfaces/cart';

import { getCartTotals } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const totals: ICartTotals = getCartTotals(state, ownProps);

    return (
        {
            totals
        }
    );
};

export const connect = reduxify(mapStateToProps);
