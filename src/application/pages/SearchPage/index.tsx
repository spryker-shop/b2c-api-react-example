/* tslint:disable:max-file-line-count */
import * as React from 'react';
import * as qs from 'query-string';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { ISearchQuery } from '@interfaces/search';
import { getCategoryNameById, getCurrentCategoriesTree } from '@helpers/categories';
import { addToQueryActiveRangeFilters } from '@helpers/queries';
import { withRouter } from 'react-router';
import { labeledCategories, pathProductPageBase } from '@constants/routes';
import { PageTitle } from '@components/PageTitle';
import { MainContainer } from '@components/MainContainer';
import { SortPanel } from './SortPanel';
import { ProductsList } from './ProductsList';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { SearchIntro } from './SearchIntro';
import { CategoriesList } from './CategoriesList';
import { SearchFilterList } from './SearchFilterList';
import { SearchPagination } from './SearchPagination';
import { Grid, withStyles, Hidden } from '@material-ui/core';
import { ISearchPageProps as Props, ISearchPageState as State } from './types';
import { styles } from './styles';

@(withRouter as Function)
@connect
class SearchPageComponent extends React.Component<Props, State> {
    public readonly state: State = {
        formattedCategoriesTree: null
    };

    public componentDidMount = (): void => {
        const parsedGetParams = qs.parse(this.props.location.search);
        let query: ISearchQuery = this.getQueryParams();

        if (parsedGetParams) {
            query = Object.assign(query, parsedGetParams);
        }
        if (!this.props.isLoading) {
            this.props.sendSearchAction(query);
            this.categoriesTree();
        }
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const { isLoading, isFiltersUpdated, locationCategoryId, isCategoryAsFilter, currentCategoryId } = this.props;

        if (isLoading) {
            return;
        }

        if (!isCategoryAsFilter && locationCategoryId !== prevProps.locationCategoryId) {
            this.sendCategoryRequest(this.getQueryBaseParams());

            return;
        }

        if (currentCategoryId !== prevProps.currentCategoryId) {
            this.categoriesTree();
        }

        if (isFiltersUpdated) {
            this.sendCategoryRequest(this.getQueryParams(), true);
        }
    };

    public componentWillUnmount = (): void => this.clearAllFilters();

    protected clearAllFilters = (): void => {
        this.props.clearActiveFiltersAction();
        this.props.clearSortAction();
        this.props.clearPaginationPageAction();
    };

    protected updatePageUrl(query: ISearchQuery): void {
        const queryString = qs.stringify(query);
        this.props.history.push({
            search: `?${queryString}`
        });
    }

    protected sendCategoryRequest = async (query: ISearchQuery, shouldUpdatePath?: boolean): Promise<void> => {
        if (!this.props.isLoading) {
            await this.props.sendSearchAction(query);
        }

        if (shouldUpdatePath) {
            this.updatePageUrl(query);
        }
    };

    protected getQueryBaseParams = (): ISearchQuery => {
        const { locationCategoryId,  currency} = this.props;
        const query: ISearchQuery = {};

        if (locationCategoryId && labeledCategories[locationCategoryId]) {
            query.label = labeledCategories[locationCategoryId];
        }

        if (locationCategoryId && !labeledCategories[locationCategoryId]) {
            query.category = locationCategoryId;
        }

        if (currency) {
            query.currency = currency;
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

    protected categoriesTree = (): void => {
      const {categoriesTree, currentCategoryId} = this.props;
      const formattedCategoriesTree = getCurrentCategoriesTree(categoriesTree, Number(currentCategoryId));

      this.setState({formattedCategoriesTree});
    };

    protected onSelectProductHandler = (sku: string): void => {
        const { formattedCategoriesTree } = this.state;
        const location = {
            pathname: `${pathProductPageBase}/${sku}`,
            state: { categoriesTree: formattedCategoriesTree }
        };

        this.props.push(location);
    };

    public render() {
        const {
            classes,
            searchTerm,
            category,
            spellingSuggestion,
            categoriesTree,
            currentCategoryId,
            sendSearchAction,
            locationCategoryId,
            history
        } = this.props;

        const isCategoriesExist = (category.length > 0);
        const categoryDisplayName = getCategoryNameById(currentCategoryId, categoriesTree);
        const { formattedCategoriesTree } = this.state;
        const categoriesList = (
            isOpened = false,
            onTitleClickHandler?: () => void,
            selectedMobileCategory?: null,
            onItemClickHandler?: (cattegoryId: number) => void,
        ): JSX.Element => (
            <CategoriesList
                categories={ category }
                categoriesTree={ categoriesTree }
                selectedCategory={ currentCategoryId }
                locationCategoryId={ locationCategoryId }
                isOpened={ isOpened }
                onTitleClick={ onTitleClickHandler }
                selectedMobileCategory={ selectedMobileCategory }
                onItemClickHandler={ onItemClickHandler }
            />
        );

        return (
            <div className={ classes.root }>
                <Breadcrumbs breadcrumbsList={ formattedCategoriesTree } />
                <PageTitle
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
                            onLinkClick={ () => sendSearchAction({ q: spellingSuggestion }) }
                        />
                    }
                </PageTitle>

                <MainContainer>
                    <Grid container spacing={ 24 }>
                        <Hidden only={['xs', 'sm', 'md']}>
                            { isCategoriesExist &&
                                <Grid item xs={ 12 } lg={ 3 } className={ classes.categoriesList }>
                                    { categoriesList() }
                                </Grid>
                            }
                        </Hidden>
                        <Grid item xs={ 12 } lg={ isCategoriesExist ? 9 : 12 }>
                            <SearchFilterList categoriesList={ categoriesList } />
                            <SortPanel />
                            <ProductsList selectProductHandler={ this.onSelectProductHandler } />
                            <SearchPagination history={ history } />
                        </Grid>
                    </Grid>
                </MainContainer>
            </div>
        );
    }
}

export const SearchPage = withStyles(styles)(SearchPageComponent);
