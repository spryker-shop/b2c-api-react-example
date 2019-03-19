import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { IBreadcrumbItem } from '@interfaces/category';
import { IBreadcrumbsProps } from './types';
import { pathCategoryPageBase, pathHomePage } from '@constants/routes';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';

export const BreadcrumbsBase: React.SFC<IBreadcrumbsProps> = props => {
    const {breadcrumbsList, classes} = props;

    return (
        <ul className={classes.list}>
            <li className={classes.item}>
                <NavLink className={classes.link} to={pathHomePage}>Home</NavLink>
                {breadcrumbsList &&
                    <span className={classes.separator}></span>
                }
            </li>
            {breadcrumbsList &&
                breadcrumbsList.map((value: IBreadcrumbItem) => {
                    const {name, nodeId, current} = value;
                    const currentClassName = current ? classes.current : null;

                    return (
                        <li className={classes.item} key={`${name}${nodeId}`}>
                            <NavLink
                                className={`${classes.link} ${currentClassName}`}
                                to={`${pathCategoryPageBase}/${nodeId}`}>
                                {name}
                            </NavLink>
                            {!current &&
                                <span className={classes.separator}></span>
                            }
                        </li>
                    );
                })
            }
        </ul>
    );
};

export const Breadcrumbs = withStyles(styles)(BreadcrumbsBase);
