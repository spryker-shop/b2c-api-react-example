import { getIsTouch } from '@stores/reducers/common/init/selectors';
import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const mainNavigation = state.navigations.mainNavigation;
    const nodesTree = mainNavigation.nodesTree ? mainNavigation.nodesTree : null;
    const isFulfilled = mainNavigation.fulfilled;
    const isTouch = getIsTouch(state, ownProps);

    return ({ nodesTree, isFulfilled, isTouch });
};

export const connect = reduxify(mapStateToProps);
