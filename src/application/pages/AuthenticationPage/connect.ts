import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { isUserAuthenticated } from '@stores/reducers/pages/login/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);

    return {
        isUserLoggedIn
    };
};

export const connect = reduxify(mapStateToProps);
