import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { ICategory } from '@interfaces/category';
import { IActiveFilterCategories, ICategoriesListProps as Props, ICategoriesListState as State } from './types';
import { getFormattedActiveCategories } from '../helpers';
import { pathCategoryPageBase } from '@constants/routes';
import { CategoryItem } from './CategoryItem';
import { List, withStyles, withWidth } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { ChevronIcon } from './icons';
import { styles } from './styles';
import { PopoverWrapper } from '@components/PopoverWrapper';
import { ClickEvent } from '@interfaces/common';

@connect
class CategoriesListComponent extends React.Component<Props, State> {
    protected buttonRef: React.RefObject<HTMLDivElement> = React.createRef();

    public readonly state: State = {
        anchorElement: null,
    };

    protected selectCategory = (categoryId: number) => (event: ClickEvent): void => {
        const { locationCategoryId, changeLocation, setCurrentCategory } = this.props;

        if (locationCategoryId !== categoryId) {
            this.closePopover();
            setCurrentCategory(categoryId);
            changeLocation(`${pathCategoryPageBase}/${categoryId}`);
        }
    };

    protected openPopover = ({ currentTarget }: ClickEvent): void => {
        this.setState(({anchorElement}) => ({ anchorElement: Boolean(anchorElement) ? null : currentTarget, }));
    };

    protected closePopover = (): void => {
        this.setState({ anchorElement: null });
    };

    protected getCategoriesList = (
        data: ICategory[],
        activeData: IActiveFilterCategories,
        selectedId: Props['selectedCategory']
    ): JSX.Element[] | null => {
        const { selectedCategory } = this.props;

        if (!Array.isArray(data) || !data.length) {
            return null;
        }

        return data.map((category: ICategory) => {
            const quantity = (activeData[category.nodeId] ? activeData[category.nodeId] : 0);
            const isSubcategoryExist = Array.isArray(category.children) && category.children.length &&
                category.children.length > 0;

            return (
                <CategoryItem
                    key={ `category-${ category.nodeId }` }
                    categoryValue={ category.nodeId }
                    isSelected={ (+selectedId) === category.nodeId }
                    isActive={ Boolean(quantity) }
                    selectCategoryHandler={ this.selectCategory }
                    quantity={ quantity }
                    categoryName={ `${ category.name ? category.name : <FormattedMessage id={ 'no.name.title' } /> }` }
                >
                    { Boolean(isSubcategoryExist) &&
                        this.getCategoriesList(category.children as ICategory[], activeData, selectedCategory)
                    }

                </CategoryItem>
            );
        });
    };

    public render = (): JSX.Element => {
        const {
            classes,
            categories,
            categoriesTree,
            selectedCategory,
            localizedName,
            width,
            isOpened,
            onTitleClick
        } = this.props;
        const activeCategories = getFormattedActiveCategories(categories);
        const { anchorElement } = this.state;
        const isOpen = Boolean(anchorElement);
        const isTablet = isWidthUp('md', width) && !isWidthUp('lg', width);

        if (!Array.isArray(categories) || !categories.length) {
            return null;
        }

        if (isTablet) {
            return (
                <div className={classes.root}>
                    <span className={ classes.title } ref={ this.buttonRef } onClick={ this.openPopover }>
                        { localizedName ? localizedName : <FormattedMessage id={ 'categories.panel.title' } /> }
                        <span className={`${classes.chevron} ${isOpen ? classes.chevronOpened : ''}`}>
                            <ChevronIcon />
                        </span>
                    </span>
                    <PopoverWrapper
                        anchorElement={ isOpen }
                        anchorReference="anchorEl"
                        hideBackdrop={ false }
                        closePopoverHandler={ this.closePopover }
                        classes={{
                            content: classes.popoverContent
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                    >
                        <List component="nav" className={classes.list}>
                            { this.getCategoriesList(categoriesTree, activeCategories, selectedCategory) }
                        </List>
                    </PopoverWrapper>
                </div>
            );
        }

        return (
            <div className={classes.root}>
                <span className={ classes.title } onClick={ onTitleClick }>
                    { localizedName ? localizedName : <FormattedMessage id={ 'categories.panel.title' } /> }
                    <span className={`${classes.chevron} ${isOpened ? classes.chevronOpened : ''}`}>
                        <ChevronIcon />
                    </span>
                </span>
                <List component="nav" className={`${classes.list} ${isOpened ? classes.listOpened : ''}`}>
                    { this.getCategoriesList(categoriesTree, activeCategories, selectedCategory) }
                </List>
            </div>
        );
    }
}

export const CategoriesList = withWidth()(withStyles(styles)(CategoriesListComponent));
