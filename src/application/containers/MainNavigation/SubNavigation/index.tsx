import * as React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { pathCategoryPageBase, pathProductPageBase } from '@constants/routes';
import { IMainNavigationNode } from '@interfaces/navigations';
import { ISubNavigationProps as Props } from './types';
import { IRelatedProductDataFixture } from '../fixtures';
import { styles } from './styles';

const SubNavigationComponent: React.SFC<Props> = (props): JSX.Element => {
    const { nodes, classes, simpleDrop, productsList } = props;
    const nodeLevel = 0;

    const renderProductLists = (): JSX.Element[] => {
        if (!Boolean(productsList)) {
            return null;
        }

        return productsList.map((item: IRelatedProductDataFixture) => {
            const { sku, image, title } = item;

            return (
                <Grid item xs={ 4 } key={`${sku}-${title}`}>
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

        return nodesTree.map((node: IMainNavigationNode, index: Number) => {

            const { title, resourceId, children, nodeType } = node;
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

            return (
                <li
                    key={`${resourceId}-${index}`}
                    className={`${classes.navItem} ${classes.navItemSimple} ${classes[`navItemLevel${level}`]}`}
                >
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
            <div className={ classes.inner }>
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
        </div>
    );
};

export const SubNavigation = withStyles(styles)(SubNavigationComponent);
