import { reduxify } from '@application/hoc/Reduxify';
import { getAppTimeZone } from '@stores/reducers/common/init/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TAppTimeZone } from '@interfaces/locale';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const timeZone: TAppTimeZone = getAppTimeZone(state, ownProps);

    return {
        timeZone,
    };
};

export const connect = reduxify(mapStateToProps);
