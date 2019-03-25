import * as React from 'react';
import * as qs from 'query-string';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { ISearchQuery } from '@interfaces/searchPageData';
import { ISearchPageProps } from './types';
import { getCategoryNameById } from '@helpers/categories';
import { addToQueryActiveRangeFilters } from './helpers/queries';
import { getLabeledCategory, getCurrentCategoriesTree } from './helpers';
import { withRouter } from 'react-router';
import { pathProductPageBase } from '@constants/routes';
import { AppPageTitle } from '@application/components/AppPageTitle';
import { AppMain } from '@application/components/AppMain';
import { SortPanel } from './SortPanel';
import { ProductsList } from './ProductsList';
import { Breadcrumbs } from './CategoriesBreadcrumbs';
import { SearchIntro } from './SearchIntro';
import { CategoriesList } from './CategoriesList';
import { SearchFilterList } from './SearchFilterList';
import { SearchPagination } from './SearchPagination';
import { Grid, withStyles } from '@material-ui/core';
import { ISearchFilterListState as State } from './SearchFilterList/types';
import { styles } from './styles';

@(withRouter as Function)
@connect
export class SearchPageComponent extends React.Component<ISearchPageProps> {
    public readonly state: State = {
        isFirstLoadPassed: null
    };

    public componentDidMount = (): void => {
        const parsedGetParams = qs.parse(this.props.location.search);
        let query: ISearchQuery = this.getQueryParams();

        if (parsedGetParams) {
            query = Object.assign(query, parsedGetParams);
        }
        if (!this.props.isLoading) {
            this.props.sendSearch(query);
        }
    };

    public componentDidUpdate = (prevProps: ISearchPageProps): void => {
        const { isLoading, isFiltersUpdated, locationCategoryId, isCategoryAsFilter } = this.props;

        if (isLoading) {
            return;
        }

        if (!isCategoryAsFilter && locationCategoryId !== prevProps.locationCategoryId) {
            this.sendCategoryRequest(this.getQueryBaseParams());

            return;
        }

        if (isFiltersUpdated) {
            this.sendCategoryRequest(this.getQueryParams(), true);
        }
    };

    public componentWillUnmount = (): void => {
        this.clearAllFilters();
    };

    protected clearAllFilters = (): void => {
        this.props.clearActiveFilters();
        this.props.clearSort();
        this.props.clearPaginationPage();
    };

    protected updatePageUrl(query: ISearchQuery): void {
        const queryString = qs.stringify(query);
        this.props.history.push({
            search: `?${queryString}`
        });
    }

    protected sendCategoryRequest = async (query: ISearchQuery, isShouldUpdatePath?: boolean): Promise<void> => {
        if (!this.props.isLoading) {
            await this.props.sendSearch(query);
        }

        if (isShouldUpdatePath) {
            this.updatePageUrl(query);
        }
    };

    protected getQueryBaseParams = (): ISearchQuery => {
        const query: ISearchQuery = {};

        if (this.props.locationCategoryId) {
            const labeledCategory = getLabeledCategory(this.props.locationCategoryId);
            if (labeledCategory) {
                query.label = labeledCategory;
            } else {
                query.category = this.props.locationCategoryId;
            }
        }
        if (this.props.currency) {
            query.currency = this.props.currency;
        }

        return query;
    };

    protected getQueryParams = (): ISearchQuery => {
        let query: ISearchQuery = this.getQueryBaseParams();

        if (this.props.searchTerm) {
            query.q = this.props.searchTerm;
        }
        if (this.props.currentSort) {
            query.sort = this.props.currentSort;
        }
        if (this.props.currentItemsPerPage) {
            query.ipp = this.props.currentItemsPerPage;
        }
        if (this.props.activeFilters) {
            query = { ...query, ...this.props.activeFilters };
        }
        if (this.props.activeRangeFilters) {

            query = { ...query, ...addToQueryActiveRangeFilters(this.props.activeRangeFilters) };
        }
        if (this.props.currentPaginationPage) {
            query.page = this.props.currentPaginationPage;
        }

        return query;
    };

    protected onSelectProductHandler = (sku: string) => {
        this.props.changeLocation(`${pathProductPageBase}/${sku}`);
    };

    public render() {
        const {
            classes,
            searchTerm,
            category,
            spellingSuggestion,
            categoriesTree,
            currentCategoryId,
            sendSearch,
            locationCategoryId,
            history
        } = this.props;

        const isCategoriesExist = (category.length > 0);
        const categoryDisplayName = getCategoryNameById(currentCategoryId, categoriesTree);
        const formattedCategoriesTree = getCurrentCategoriesTree(categoriesTree, Number(currentCategoryId));

        return (
            <div className={ classes.root }>
                <Breadcrumbs breadcrumbsList={ formattedCategoriesTree } />
                <AppPageTitle
                    title={ searchTerm
                        ? <FormattedMessage id={ 'search.result.title' } values={ { terms: searchTerm } } />
                        : (currentCategoryId && categoryDisplayName)
                            ? categoryDisplayName
                            : <FormattedMessage id={ 'search.result.default.title' } />
                    }
                >
                    { spellingSuggestion &&
                        <SearchIntro
                            spellingSuggestion={ spellingSuggestion }
                            onLinkClick={ () => sendSearch({ q: spellingSuggestion }) }
                        />
                    }
                </AppPageTitle>

                <AppMain>
                    <Grid container spacing={ 24 }>
                        <Grid item xs={ isCategoriesExist ? 12 : null } md={ isCategoriesExist ? 3 : null }>
                            <CategoriesList
                                categories={ category }
                                categoriesTree={ categoriesTree }
                                selectedCategory={ currentCategoryId }
                                locationCategoryId={ locationCategoryId }
                            />
                        </Grid>
                        <Grid item xs={ 12 } md={ isCategoriesExist ? 9 : 12 }>
                            <SearchFilterList />

                            <SortPanel />

                            <ProductsList selectProductHandler={ this.onSelectProductHandler } />

                            <SearchPagination history={ history } />
                        </Grid>
                    </Grid>
                </AppMain>
            </div>
        );
    }
}

export const SearchPage = withStyles(styles)(SearchPageComponent);
