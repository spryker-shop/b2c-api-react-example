import { reduxify } from '@application/hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TAppCurrency } from '@interfaces/currency';
import { getAppCurrency } from '@stores/reducers/common/init';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const currency: TAppCurrency = getAppCurrency(state, ownProps);

    return ({
        currency,
    });
};

export const connect = reduxify(mapStateToProps);
