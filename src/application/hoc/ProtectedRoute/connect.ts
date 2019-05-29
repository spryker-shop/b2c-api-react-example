import { reduxify } from '@hoc/Reduxify';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getAnonymId, isAppStateFulfilled } from '@stores/reducers/common/init/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const isInitStateFulfilled: boolean = isAppStateFulfilled(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);

    return ({
        isUserLoggedIn,
        isInitStateFulfilled,
        anonymId,
    });
};

export const connect = reduxify(mapStateToProps);
