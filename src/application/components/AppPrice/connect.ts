import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TAppCurrency } from '@interfaces/currency';
import { getAppCurrency } from '@stores/reducers/common/init/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const currency: TAppCurrency = getAppCurrency(state, ownProps);

    return ({
        currency,
    });
};

export const connect = reduxify(mapStateToProps);
