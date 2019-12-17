import { getIsTouch } from '@stores/reducers/common/init/selectors';
import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IMainNavigationNode } from '@interfaces/navigations';
import { IMainNavigation } from '@stores/reducers/common/navigations/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const mainNavigation: IMainNavigation = state.navigations.mainNavigation;
    const nodesTree: IMainNavigationNode[] = mainNavigation.nodesTree ? mainNavigation.nodesTree : null;
    const isFulfilled: boolean = mainNavigation.fulfilled;
    const isTouch: boolean = getIsTouch(state, ownProps);

    return {
        nodesTree,
        isFulfilled,
        isTouch
    };
};

export const connect = reduxify(mapStateToProps);
