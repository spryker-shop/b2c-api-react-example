import { reduxify } from '@hoc/Reduxify';
import { getCounties } from '@stores/reducers/common/init/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICountry } from '@interfaces/country';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const countriesCollection: ICountry[] = getCounties(state, ownProps);

    return {
        countriesCollection
    };
};

export const connect = reduxify(mapStateToProps);
