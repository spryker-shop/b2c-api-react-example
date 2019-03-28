import * as React from 'react';
import { connect } from './connect';
import { pathCategoryPageBase, pathURLToCategoryNew, pathURLToCategorySale } from '@constants/routes';
import { FormattedMessage } from 'react-intl';
import { NavLink, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { SubNavigation } from './SubNavigation';
import { fixtures } from './fixtures';
import { ClickEvent } from '@interfaces/common';
import { IMainNavProps as Props } from './types';
import { IMainNavigationNode } from '@interfaces/navigations';
import { styles } from './styles';
import { appBreakpoints } from '@theme/properties/overwritten/appBreakpoints';

@(withRouter as Function)
class MainNavigationComponent extends React.Component<Props, any> {
    public readonly state: any = {
        isOpen: false,
        selectedNode: null
    };

    public componentDidUpdate = (prevProps: Props): void => {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({ selectedNode: null });
        }
    };

    protected onClickLinkHandler = (node: IMainNavigationNode) => (event: ClickEvent): void => {
        const { isTouch } = this.props;
        const isMobile = window.innerWidth < appBreakpoints.values.md;

        if (isTouch && !isMobile && Boolean(node.children.length)) {
            event.preventDefault();
            const { selectedNode } = this.state;
            const newSelectedNode = selectedNode !== node ? node : null;

            this.setState({ selectedNode: newSelectedNode });
        }
    };

    protected onClickBackdropHandler = (): void => {
        const { isTouch } = this.props;

        if (isTouch) {
            this.setState({ selectedNode: null });
        }
    };

    protected renderCategoriesList = (): JSX.Element[] => {
        const { nodesTree, classes, isTouch } = this.props;
        const isMobile = window.innerWidth < appBreakpoints.values.md;
        const isTouchScreen = isTouch && !isMobile;

        if (!Boolean(nodesTree.length)) {
            return null;
        }

        const commonItems: IMainNavigationNode[] = [
            {
                nodeType: 'category',
                title: <FormattedMessage id={ 'category.name.sale' } />,
                resourceId: pathURLToCategorySale,
                children: []
            },
            {
                nodeType: 'category',
                title: <FormattedMessage id={ 'category.name.new' } />,
                resourceId: pathURLToCategoryNew,
                children: []
            }
        ];

        const navigationList = nodesTree.concat(commonItems);

        return navigationList.map((node: IMainNavigationNode, index: Number) => {

            const { selectedNode } = this.state;
            const { title, resourceId, children, nodeType } = node;
            const productsPreviewList = fixtures.filter(item => item.relatedCategoryId === resourceId)
                .map(item => item.relatedProducts);
            const isNodeSelected = selectedNode === node;

            const isProductsExist = Boolean(productsPreviewList.length);
            let linkType;

            switch (nodeType) {
                case 'category':
                    linkType = (
                        <NavLink
                            onClick={ this.onClickLinkHandler(node) }
                            className={ classes.mainNavLink }
                            to={`${pathCategoryPageBase}/${resourceId}`}
                        >
                            { title }
                        </NavLink>
                    );
                    break;
                default:
                    linkType = (
                        <span
                            onClick={ this.onClickLinkHandler(node) }
                            className={ classes.mainNavLink }
                        >
                            { title }
                        </span>
                    );
            }
            const itemContainerClass = !isProductsExist ? classes.mainNavItemContainer : '';
            const itemSelectedClass = isTouchScreen && isNodeSelected ? classes.mainNavItemSelected : '';
            const itemHoverableClass = !isTouchScreen ? classes.mainNavItemHoverable : '';
            const itemVisibilityClasses = `${itemSelectedClass} ${itemHoverableClass}`;

            return (
                <span
                    key={`${resourceId}-${index}`}
                    className={`${classes.mainNavItem} ${itemContainerClass} ${itemVisibilityClasses}`}
                >
                    { linkType }
                    { Boolean(children.length) &&
                        <div className={`${classes.subNavLayout} ${!isProductsExist ? classes.subNavSimple : ''} `}>
                            <SubNavigation
                                isTouch={ isTouch }
                                mainMenuType={ nodeType }
                                mainMenuItemId={ resourceId }
                                nodes={ children }
                                simpleDrop={ !isProductsExist }
                                productsList={ isProductsExist && productsPreviewList[0] }
                            />
                            <span
                                onClick={ this.onClickBackdropHandler }
                                className={`${classes.backdrop} ${!isTouchScreen ? classes.backdropHoverable : ''}`}
                            />
                        </div>
                    }
                </span>
            );
        });
    };

    public render() {
        const { classes, mobileNavState, isFulfilled } = this.props;

        return (
            <nav className={`${classes.mainNav} ${mobileNavState ? classes.mainNavOpened : ''}`}>
                { isFulfilled && this.renderCategoriesList() }
            </nav>
        );
    }
}

export const MainNavigation = connect(withStyles(styles)(MainNavigationComponent));
