import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getAppCurrency } from '@stores/reducers/common/init/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const currency: string | null = getAppCurrency(state, ownProps);

    return ({
        currency,
    });
};

export const connect = reduxify(mapStateToProps);
