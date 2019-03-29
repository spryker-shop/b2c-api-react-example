import * as React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { pathCategoryPageBase, pathProductPageBase } from '@constants/routes';
import { IMainNavigationNode } from '@interfaces/navigations';
import { ISubNavigationProps as Props } from './types';
import { IRelatedProductDataFixture } from '../fixtures';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';

const SubNavigationComponent: React.SFC<Props> = (props): JSX.Element => {
    const { nodes, classes, simpleDrop, productsList } = props;
    const nodeLevel = 0;

    const renderProductLists = (): JSX.Element[] => {
        if (!Boolean(productsList)) {
            return null;
        }

        return productsList.map((item: IRelatedProductDataFixture, index: number) => {
            const { sku, image, title } = item;
            const classForLastItem = index >= 2 ? classes.hideOntablet : '';

            return (
                <Grid item xs={ 6 } lg={ 4 } key={`${sku}-${title}`} className={ classForLastItem }>
                    <NavLink className={ classes.productContainer } to={`${pathProductPageBase}/${sku}`}>
                        <span className={ classes.productImage } style={{ backgroundImage: `url(${image})`}} />
                        <span className={ classes.productTitle }>
                            <Typography variant="headline" component="span" color="textSecondary">{ title }</Typography>
                        </span>
                    </NavLink>
                </Grid>
            );
        });
    };

    const renderCategoriesList = (nodesTree: IMainNavigationNode[], level: number): JSX.Element[] => {
        if (!Boolean(nodesTree)) {
            return null;
        }
        const { mainMenuType, mainMenuItemId, isTouch } = props;
        const viewAllItem: IMainNavigationNode = {
            title: <FormattedMessage id={ 'view.all.title' } />,
            resourceId: mainMenuItemId,
            nodeType: mainMenuType,
            children: [],
            additionalItem: true
        };

        const isViewAllItemExist = nodesTree.filter(item => item.resourceId === mainMenuItemId).length;

        if (!simpleDrop && !Boolean(isViewAllItemExist)) {
            nodesTree.unshift(viewAllItem);
        }

        return nodesTree.map((node: IMainNavigationNode, index: Number) => {

            const { title, resourceId, children, nodeType, additionalItem } = node;
            let linkType;

            switch (nodeType) {
                case 'label':
                    linkType = <span className={`${classes.navLink} ${classes.navStatic}`}>{ title }</span>;
                    break;
                case 'category':
                    linkType = (
                        <NavLink className={ classes.navLink } to={`${pathCategoryPageBase}/${resourceId}`}>
                            { title }
                        </NavLink>
                    );
                    break;
                default:
                    linkType = <span className={`${classes.navLink} ${classes.navStatic}`}>{ title }</span>;
            }

            const isItemAdditional = isTouch && additionalItem ? classes.navItemAdditional : '';
            const itemClasses = `${classes.navItem} ${classes.navItemSimple} ${classes[`navItemLevel${level}`]} 
                ${isItemAdditional}`;

            return (
                <li key={`${resourceId}-${index}`} className={ itemClasses }>
                    { linkType }
                    { Boolean(children.length) &&
                        <ul className={`${classes.listReset} ${classes.listChild}`}>
                            { renderCategoriesList(children, level + 1) }
                        </ul>
                    }
                </li>
            );
        });
    };

    if (simpleDrop) {
        return (
            <div className={`${classes.layout} ${classes.layoutSimple}`}>
                <div className={ classes.inner }>
                    <ul className={ classes.listReset }>
                        { renderCategoriesList(nodes, nodeLevel) }
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className={ classes.layout }>
            <div className={ classes.container }>
                <div className={ classes.grid }>
                    <div className={`${classes.col} ${classes.colList}`}>
                        <ul className={ classes.listReset }>
                            { renderCategoriesList(nodes, nodeLevel) }
                        </ul>
                    </div>
                    <div className={`${classes.col} ${classes.colPreviews}`}>
                        <Grid container spacing={ 24 }>
                            { renderProductLists() }
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SubNavigation = withStyles(styles)(SubNavigationComponent);
