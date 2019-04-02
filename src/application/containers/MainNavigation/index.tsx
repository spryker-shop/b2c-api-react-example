import * as React from 'react';
import { connect } from './connect';
import { pathCategoryPageBase, pathURLToCategoryNew, pathURLToCategorySale } from '@constants/routes';
import { FormattedMessage } from 'react-intl';
import { NavLink, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { SubNavigation } from './SubNavigation';
import { fixtures } from './fixtures';
import { ClickEvent } from '@interfaces/common';
import { IMainNavProps as Props, IMainNavState as State } from './types';
import { IMainNavigationNode } from '@interfaces/navigations';
import { styles } from './styles';
import { ChevronIcon, CrossIcon } from './icons';
import { resolutionChecker } from '@helpers/common/resolutionChecker';

@(withRouter as Function)
class MainNavigationComponent extends React.Component<Props, State> {
    protected navRef: Element;

    public readonly state: State = {
        isOpen: false,
        selectedNode: null,
        openedNodes: []
    };

    public componentDidMount = (): void  => {
        document.addEventListener('touchstart', this.handleClickOutside, false);
    };

    public componentWillUnmount= (): void  => {
        document.removeEventListener('touchstart', this.handleClickOutside, false);
    };

    protected closeMenuItems = (): void => this.setState({ selectedNode: null, openedNodes: [] });

    public componentDidUpdate = (prevProps: Props): void => {
        const { onMobileNavToggle, location } = this.props;

        if (location.pathname !== prevProps.location.pathname) {
            this.closeMenuItems();
            onMobileNavToggle(false);
        }
    };

    protected onClickBackdropHandler = (): void => {
        const { isTouch, onMobileNavToggle } = this.props;

        if (isTouch) {
            this.closeMenuItems();
            onMobileNavToggle(false);
        }
    };

    protected handleClickOutside = (event: TouchEvent): void => {
        const { target } = event;
        const isTouchOutside = !this.navRef.contains(target as Element);

        if (isTouchOutside) {
            this.closeMenuItems();
        }
    };

    protected onClickLinkHandler = (node: IMainNavigationNode) => (event: ClickEvent): void => {
        const { isTouch, onMobileNavToggle } = this.props;
        const isMobile = resolutionChecker(window.innerWidth, 'md');

        if (isTouch && !isMobile && Boolean(node.children.length)) {
            event.preventDefault();
            const { selectedNode } = this.state;
            const newSelectedNode = selectedNode !== node ? node : null;

            onMobileNavToggle(false);
            this.setState({ selectedNode: newSelectedNode, openedNodes: [] });
        }
    };

    protected onChevronClickHandler = (node: IMainNavigationNode) => (event: ClickEvent): void => {
        event.preventDefault();
        const { openedNodes } = this.state;
        const isNodeOpened = openedNodes.includes(node);

        if (isNodeOpened) {
            const removeNodeFromList = openedNodes.filter(nodeItem => nodeItem !== node);

            this.setState({ openedNodes: removeNodeFromList, selectedNode: null });

            return;
        }

        const openedNodesList = [...openedNodes, node];

        this.setState({ openedNodes: openedNodesList, selectedNode: null });
    };

    protected renderCategoriesList = (): JSX.Element[] => {
        const { nodesTree, classes, isTouch, headerHeight } = this.props;
        const isMobile = resolutionChecker(window.innerWidth, 'md');
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

            const { selectedNode, openedNodes } = this.state;
            const { title, resourceId, children, nodeType } = node;
            const productsPreviewList = fixtures.filter(item => item.relatedCategoryId === resourceId)
                .map(item => item.relatedProducts);
            const isNodeSelected = selectedNode === node;
            const isNodeOpened = openedNodes.filter((nodeItem: IMainNavigationNode) => node === nodeItem).length;
            const chevronTemplate = Boolean(children.length) ? (
                <span className={`${classes.chevron}`} onClick={ this.onChevronClickHandler(node) }>
                    <span className={`${classes.chevronIcon} ${isNodeOpened ? classes.chevronIconOpened : ''}`}>
                        <ChevronIcon />
                    </span>
                </span>
            ) : null;

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
                            { title } { chevronTemplate }
                        </NavLink>
                    );
                    break;
                default:
                    linkType = (
                        <span
                            onClick={ this.onClickLinkHandler(node) }
                            className={ classes.mainNavLink }
                        >
                            { title } { chevronTemplate }
                        </span>
                    );
            }

            const itemContainerClass = !isProductsExist ? classes.mainNavItemContainer : '';
            const itemSelectedClass = isTouchScreen && isNodeSelected ? classes.mainNavItemSelected : '';
            const itemHoverableClass = !isTouch ? classes.mainNavItemHoverable : '';
            const itemOpenedClass = isNodeOpened && isMobile ? classes.mainNavItemOpened : '';
            const itemVisibilityClasses = `${itemSelectedClass} ${itemHoverableClass} ${itemOpenedClass}`;

            return (
                <span
                    key={`${resourceId}-${index}`}
                    className={`${classes.mainNavItem} ${itemContainerClass} ${itemVisibilityClasses}`}
                >
                    { linkType }
                    { Boolean(children.length) &&
                        <div className={`${classes.subNavLayout} ${!isProductsExist ? classes.subNavSimple : ''} `}>
                            <SubNavigation
                                headerHeight={ headerHeight }
                                isTouch={ isTouch }
                                mainMenuType={ nodeType }
                                mainMenuItemId={ resourceId }
                                nodes={ children }
                                simpleDrop={ !isProductsExist }
                                productsList={ isProductsExist && productsPreviewList[0] }
                            />
                            <span
                                onClick={ this.onClickBackdropHandler }
                                className={`
                                    ${classes.subBackdrop} ${!isTouchScreen ? classes.subBackdropHoverable : ''}
                                `}
                            />
                        </div>
                    }
                </span>
            );
        });
    };

    public render() {
        const { classes, isFulfilled, onMobileNavToggle, isMobileNavOpened } = this.props;

        return (
            <nav
                className={`${classes.mainNav} ${isMobileNavOpened ? classes.mainNavOpened : ''}`}
                ref={nav => this.navRef = nav }
            >
                <div className={ classes.mainNavInner }>
                    <div className={ classes.mainNavList }>
                        { isFulfilled && this.renderCategoriesList() }
                    </div>
                    <span className={ classes.close } onClick={ () => onMobileNavToggle(false) } >
                        <span className={ classes.closeIcon }><CrossIcon /></span>
                    </span>
                </div>
                <span
                    className={`${classes.backdrop} ${isMobileNavOpened ? classes.backdropVisible : ''}`}
                    onClick={ () => onMobileNavToggle(false) }
                />
            </nav>
        );
    }
}

export const MainNavigation = connect(withStyles(styles)(MainNavigationComponent));
