import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { IMainNavProps as Props } from './types';
import { styles } from './styles';
import { connect } from './connect';
import { fixtures } from './fixtures';
import { IMainNavigationNode } from '@interfaces/navigations';
import { pathCategoryPageBase, pathURLToCategoryNew, pathURLToCategorySale } from '@constants/routes';
import { SubNavigation } from './SubNavigation';
import { FormattedMessage } from 'react-intl';

class MainNavigationComponent extends React.Component<Props> {
    public componentDidMount = (): void => {
        this.props.getMainNavigationAction();
    };

    public componentDidUpdate = (prevProps: Props): void => {
        if (prevProps.locale !== this.props.locale) {
            this.props.getMainNavigationAction();
        }
    };

    protected renderCategoriesList = (): JSX.Element[] => {
        const { nodesTree, classes } = this.props;

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
            const { title, resourceId, children, nodeType } = node;
            const productsPreviewList = fixtures.filter(item => item.relatedCategoryId === resourceId)
                .map(item => item.relatedProducts);

            const isProductsExist = Boolean(productsPreviewList.length);
            let linkType;

            switch (nodeType) {
                case 'label':
                    linkType = <span className={ classes.mainNavLink }>{ title }</span>;
                    break;
                case 'category':
                    linkType = (
                        <NavLink className={ classes.mainNavLink } to={ `${pathCategoryPageBase}/${resourceId}` }>
                            { title }
                        </NavLink>
                    );
                    break;
                default:
                    linkType = <span className={ classes.mainNavLink }>{ title }</span>;
            }
            const itemContainerClass = !isProductsExist ? classes.mainNavItemContainer : '';

            return (
                <span key={`${resourceId}-${index}`} className={`${classes.mainNavItem} ${itemContainerClass}`}>
                    { linkType }
                    { Boolean(children.length) &&
                        <SubNavigation
                            nodes={ children }
                            classes={{ layout: classes.subNavLayout }}
                            simpleDrop={ !isProductsExist }
                            productsList={ isProductsExist && productsPreviewList[0] }
                        />
                    }
                </span>
            );
        });
    };

    public render() {
        const { classes, mobileNavState } = this.props;

        return (
            <nav className={ `${classes.mainNav} ${mobileNavState ? classes.mainNavOpened : ''}` }>
                { this.renderCategoriesList() }
            </nav>
        );
    }
}

export const MainNavigation = connect(withStyles(styles)(MainNavigationComponent));
