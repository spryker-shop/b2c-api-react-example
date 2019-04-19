import { reduxify } from '@application/hoc/Reduxify';
import { getCreatedOrder } from '@stores/reducers/pages/checkout/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const orderId: string = getCreatedOrder(state, ownProps);

    return ({
        orderId
    });
};

export const connect = reduxify(mapStateToProps);
