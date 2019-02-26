import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import * as qs from 'query-string';
import { withRouter } from 'react-router';
import { RangeFacets, ISearchQuery } from '@interfaces/searchPageData';
import { pathCategoryPageBase, pathProductPageBase } from '@constants/routes';
import { AppPageTitle } from '@application/components/AppPageTitle';
import { TSprykerRangeSliderName } from '@application/components/UI/SprykerRangeSlider/types';
import { ActiveFiltersList } from '@application/pages/SearchPage/ActiveFiltersList';
import { SortPanel } from '@application/pages/SearchPage/SortPanel';
import { FoundItems } from '@application/pages/SearchPage/FoundItems';
import { SprykerSelect } from '@application/components/UI/SprykerSelect';
import { ProductsList } from '@application/pages/SearchPage/ProductsList';
import { rangeFilterValueToFront } from '@helpers/common/transform';
import { AppPagination } from '@application/components/AppPagination';
import {
    getFiltersLocalizedNames,
    getRangeFiltersLocalizedNames,
    isValidRangeInput,
    getLabeledCategory,
    getCurrentCategoriesTree
} from '@application/pages/SearchPage/helpers';
import { AppMain } from '@application/components/AppMain';
import {
    filterTypeFilter,
    filterTypeRange,
    IFilterItemToDelete,
    ISearchPageProps,
    ISearchPageState,
    rangeMaxType,
    rangeMinType,
    RangeType,
    TCategoryId,
    TFilterItemValue,
} from './types';
import { connect } from './connect';
import { SearchIntro } from './SearchIntro';
import { CategoriesList } from './CategoriesList';
import { SearchFilterList } from './SearchFilterList';
import { SearchPageContext } from './context';
import {
    addToQueryActiveRangeFilters,
} from '@application/pages/SearchPage/helpers/queries';
import { getCategoryNameById } from '@helpers/categories';
import { FormattedMessage } from 'react-intl';
import { NotificationsMessage } from '@application/components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';
import { Breadcrumbs } from '@application/pages/SearchPage/CategoriesBreadcrumbs';

@(withRouter as Function)
@connect
export class SearchPage extends React.Component<ISearchPageProps, ISearchPageState> {
    constructor(props: ISearchPageProps) {
        super(props);

        this.state = {
            activeFilters: props.activeFilters,
            activeRangeFilters: props.activeRangeFilters,
            sort: props.currentSort,
            itemsPerPage: props.pagination.currentItemsPerPage,
            isFiltersReset: false,
            isNeedNewRequest: false,
            isReadyToNewRequest: false,
            isCategoryAsFilter: false,

            paginationPage: null
        };
    }

    public componentDidMount = (): void => {
        this.sendCategoryRequest();
    };

    public componentDidUpdate = (prevProps: ISearchPageProps, prevState: ISearchPageState): void => {
        const {locationCategoryId, currency} = this.props;

        if (locationCategoryId && currency && locationCategoryId !== prevProps.locationCategoryId) {
            this.runNewCategoryPage();
        }

        // Init new request if it's needed
        if (this.state.isReadyToNewRequest) {
            if (!prevState.isReadyToNewRequest && this.state.isNeedNewRequest) {
                this.updateSearch();
                this.setState({isReadyToNewRequest: false});
            }
            if (this.state.isReadyToNewRequest && !this.state.isNeedNewRequest) {
                this.setState({isReadyToNewRequest: false});
            }
        }
    };

    public componentWillUnmount = (): void => {
        this.props.clearActiveFilters();
    };

    protected selectCategory = (categoryId: TCategoryId) => (event: React.MouseEvent<HTMLElement>): void => {
        if (this.props.locationCategoryId !== categoryId) {
            this.props.changeLocation(`${pathCategoryPageBase}/${categoryId}`);
            this.setState({
                isCategoryAsFilter: true
            });
        }
    };

    protected updateActiveFilters = (name: string, values: string[]) => {
        this.setState((prevState: ISearchPageState) => ({
            activeFilters: {
                ...prevState.activeFilters,
                [name]: values,
            },
            paginationPage: 1,
            isFiltersReset: false,
            isNeedNewRequest: true
        }));
    };

    protected updateRangeFilters = (name: TSprykerRangeSliderName, {min, max}: RangeType) => {
        const currentData = this.props.rangeFilters.filter((filter: RangeFacets) => (filter.name === name))[0];
        const currentDataActiveMin = rangeFilterValueToFront(currentData.activeMin, rangeMinType);
        const currentDataActiveMax = rangeFilterValueToFront(currentData.activeMax, rangeMaxType);

        if (currentDataActiveMin === min && currentDataActiveMax === max) {
            return;
        }

        this.setState((prevState: ISearchPageState) => (
            {
                activeRangeFilters: {
                    ...prevState.activeRangeFilters,
                    [name]: {min, max},
                },
                paginationPage: 1,
                isFiltersReset: false,
                isNeedNewRequest: true
            }
        ));
    };

    protected resetRangeFilter = ({name}: IFilterItemToDelete): boolean => {
        if (!name) {
            return;
        }

        const {...activeRanges} = this.state.activeRangeFilters;
        delete activeRanges[name];

        this.setState({
            activeRangeFilters: {
                ...activeRanges,
            },
            isFiltersReset: false,
            isNeedNewRequest: true,
            paginationPage: 1,
        });

        return true;
    };

    protected resetFilterOneValue = ({name, value}: IFilterItemToDelete): boolean => {
        const values = [...this.state.activeFilters[name]].filter((val: TFilterItemValue) => val !== value);
        this.updateActiveFilters(name, values);

        return true;
    };

    protected updateSearch = (needResetURLParam: boolean = true): boolean => {
        if (!this.validateData()) {
            console.error('can\'t make request in updateSearch method!!!');
            NotificationsMessage({
                id: 'validate.range.input.error.message',
                type: typeNotificationError
            });

            return;
        }

        const query: ISearchQuery = this.getQueryBaseParams();

        if (needResetURLParam === true) {
            this.setPaginationParam('1');
        }

        this.props.sendSearch(query);
        this.updatePageUrl(query);
        this.setState((prevState: ISearchPageState) => ({
            ...prevState,
            isReadyToNewRequest: false,
            isNeedNewRequest: false,
            paginationPage: needResetURLParam ? 1 : prevState.paginationPage,
        }));

        return true;
    };

    protected updatePageUrl(query: ISearchQuery): void {
        const queryString = qs.stringify(query);
        this.props.history.push({
            search: `?${queryString}`
        });
    }

    protected handleSetSorting = (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode): void => {
        this.runSetSorting(event.target.value);
    };

    protected handleSetItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode): void => {
        this.runSetItemsPerPage(Number(event.target.value));
    };

    protected handlePagination = (event: React.ChangeEvent<{}>, value: number | string): void => {
        this.runSetPaginationPage(value);
    };

    protected onSelectProductHandler = (sku: string) => {
        this.props.changeLocation(`${pathProductPageBase}/${sku}`);
    };

    protected deleteActiveFilterHandler = (itemToDelete: IFilterItemToDelete) =>
        (event: React.MouseEvent<HTMLElement>): void => {

            if (itemToDelete.type === filterTypeFilter) {
                this.resetFilterOneValue(itemToDelete);
            } else if (itemToDelete.type === filterTypeRange) {
                this.resetRangeFilter(itemToDelete);
            }

            this.setState({isReadyToNewRequest: true});
        };

    protected resetActiveFilters = (event: React.MouseEvent<HTMLDivElement>): void => {
        this.runResetActiveFilters();
    };

    protected onCloseFilterHandler = (event: React.ChangeEvent<{}>): void => {
        this.setState({isReadyToNewRequest: true});
    };

    protected onAfterChangeRangeFilterHandler = (value: number[]): void => {
        this.setState({isReadyToNewRequest: true});
    };

    static getDerivedStateFromProps = (props: ISearchPageProps, state: ISearchPageState) => {
        if (state.isNeedNewRequest || state.isReadyToNewRequest) return state;

        return {
            activeFilters: {
                ...props.activeFilters
            },
            activeRangeFilters: {
                ...props.activeRangeFilters
            }
        };
    };

    protected validateData = (): boolean => (
        isValidRangeInput(this.state.activeRangeFilters, this.props.rangeFilters)
    );

    protected sendCategoryRequest = async (): Promise<void> => {
        const parsedGetParams = qs.parse(this.props.location.search);
        let query: ISearchQuery = this.getQueryBaseParams();

        if (parsedGetParams) {
            query = Object.assign(query, parsedGetParams);
        }

        if (!this.props.isLoading) {
            await this.props.sendSearch(query);
        }
        this.updatePageUrl(query);
    };

    protected setPaginationParam = (page: string): void => {
        const searchQuery = new URLSearchParams(this.props.history.location.search);
        searchQuery.set('page', page);
        this.props.history.replace({...this.props.history.location, search: searchQuery.toString()});
    };

    protected getQueryBaseParams = (): ISearchQuery => {
        let query: ISearchQuery = {};

        if (this.props.searchTerm) {
            query.q = this.props.searchTerm;
        }
        if (this.props.currency) {
            query.currency = this.props.currency;
        }
        if (this.props.locationCategoryId) {
            const labeledCategory = getLabeledCategory(this.props.locationCategoryId);
            if (labeledCategory) {
                query.label = labeledCategory;
            } else {
                query.category = this.props.locationCategoryId;
            }
        }
        if (this.state.sort) {
            query.sort = this.state.sort;
        }
        if (this.state.itemsPerPage) {
            query.ipp = this.state.itemsPerPage;
        }
        if (this.state.activeFilters) {
            query = {...query, ...this.state.activeFilters};
        }
        if (this.state.activeRangeFilters) {
            query = {...query, ...addToQueryActiveRangeFilters(this.state.activeRangeFilters)};
        }
        if (this.state.paginationPage) {
            query.page = this.state.paginationPage;
        }

        return query;
    };

    protected runResetActiveFilters = async (needUpdateSearch: boolean = true): Promise<void> => {
        this.props.clearActiveFilters();
        await this.setState((prevState: ISearchPageState) => (
            {
                ...prevState,
                activeFilters: {},
                activeRangeFilters: {},
                selectedCategory: null,
                isFiltersReset: true,
                isNeedNewRequest: false,
                isReadyToNewRequest: false,
                paginationPage: 1,
            }
        ));

        if (needUpdateSearch) {
            await this.updateSearch();
        }
    };

    protected runSetItemsPerPage = async (itemsPerPage: ISearchPageState['itemsPerPage']): Promise<void> => {
        await this.setState({paginationPage: 1, itemsPerPage, isReadyToNewRequest: true});
        await this.updateSearch();
    };

    protected runSetPaginationPage = async (page: ISearchPageState['paginationPage']): Promise<void> => {
        await this.setState({paginationPage: page, isReadyToNewRequest: true});
        this.setPaginationParam(String(page));
        await this.updateSearch(false);
    };

    protected runSetSorting = async (sortMode: ISearchPageState['sort']): Promise<void> => {
        await this.setState({sort: sortMode, isReadyToNewRequest: true});
        await this.updateSearch();
    };

    protected runNewCategoryPage = async (): Promise<void> => {
        if (!this.state.isCategoryAsFilter) {
            await this.resetAllFiltersOnNewCategoryPage();
        }
        await this.sendCategoryRequest();
        this.setState({
            isCategoryAsFilter: false
        });
    };

    protected resetAllFiltersOnNewCategoryPage = async (): Promise<void> => {
        this.updatePageUrl({});
        await this.props.clearSearchTerm();
        await this.props.clearActiveFilters();

        this.setState({
            activeFilters: {},
            activeRangeFilters: {},
            paginationPage: null,
            sort: '',
            itemsPerPage: this.props.pagination.validItemsPerPageOptions[0],
        });
    };

    public render() {
        const {
            items,
            searchTerm,
            currency,
            filters,
            activeFilters,
            rangeFilters,
            activeRangeFilters,
            isLoading,
            sortParams,
            sortParamLocalizedNames,
            pagination,
            category,
            spellingSuggestion,
            categoriesTree,
            categoriesLocalizedName,
            currentCategory,
            productsLabeled,
            availableLabels,
            sendSearch
        } = this.props;

        const isSortParamsExist = (sortParams.length > 0);
        const isProductsExist = (items.length > 0);
        const isCategoriesExist = (category.length > 0);
        const currentItemsPerPage = this.props.pagination.currentItemsPerPage;
        const currentSort = this.props.currentSort || ' ';

        const sortPanelNumberMode = (
            <SprykerSelect
                currentMode={currentItemsPerPage}
                changeHandler={this.handleSetItemsPerPage}
                menuItems={pagination.validItemsPerPageOptions.map((item: number) => ({value: item, name: item}))}
                menuItemFirst={ {
                    value: ' ',
                    name: <FormattedMessage id={ 'products.per.page.title' } />,
                    disabled: true
                } }
                name="pages"
            />
        );

        const sortPanelSorterMode = (
            <SprykerSelect
                currentMode={currentSort}
                changeHandler={this.handleSetSorting}
                menuItems={sortParams.filter((item: string) => item !== 'rating').map((item: string) => ({
                    value: item,
                    name:
                        (
                            sortParamLocalizedNames && sortParamLocalizedNames[item]
                        ) ? sortParamLocalizedNames[item] : `${item}`,
                }))}
                menuItemFirst={ {
                    value: ' ',
                    name: (!isSortParamsExist && !this.state.sort)
                        ? <FormattedMessage id={ 'sort.model.title' } />
                        : <FormattedMessage id={ 'relevance.sort.model.title' } />,
                    disabled: !isSortParamsExist,
                } }
                name="sort"
                title={null}
            />
        );

        const categoryDisplayName = getCategoryNameById(currentCategory, categoriesTree);
        const formattedCategoriesTree = getCurrentCategoriesTree(categoriesTree, currentCategory);

        return (
            <AppMain>
                <Breadcrumbs breadcrumbsList={formattedCategoriesTree} />

                <AppPageTitle
                    title={ searchTerm
                        ? <FormattedMessage
                            id={ 'search.result.title' }
                            values={ { terms: searchTerm } }
                        />
                        : (currentCategory && categoryDisplayName)
                            ? categoryDisplayName
                            : <FormattedMessage id={ 'search.result.default.title' } />
                    }
                    intro={ <SearchIntro spellingSuggestion={ spellingSuggestion }
                                         onLinkClick={() => sendSearch({q: spellingSuggestion})} /> }
                />
                <Grid container>
                    <SearchPageContext.Provider
                        value={{
                            selectCategoryHandler: this.selectCategory,
                            deleteActiveFilterHandler: this.deleteActiveFilterHandler,
                        }}
                    >
                        <Grid item xs={isCategoriesExist ? 12 : null} md={isCategoriesExist ? 3 : null}>
                            <CategoriesList
                                categories={category}
                                localizedName={categoriesLocalizedName}
                                categoriesTree={categoriesTree}
                                selectedCategory={currentCategory}
                            />
                        </Grid>

                        <Grid item xs={12} md={isCategoriesExist ? 9 : 12}>
                            <Grid container>
                                <SearchFilterList
                                    filters={filters}
                                    updateFilterHandler={this.updateActiveFilters}
                                    activeValuesFilters={this.state.activeFilters}
                                    ranges={rangeFilters}
                                    activeValuesRanges={this.state.activeRangeFilters}
                                    updateRangeHandler={this.updateRangeFilters}
                                    onCloseFilterHandler={this.onCloseFilterHandler}
                                    onAfterChangeRangeFilter={this.onAfterChangeRangeFilterHandler}
                                    isFiltersReset={this.state.isFiltersReset}
                                    isProductsExist={isProductsExist}
                                />
                                <ActiveFiltersList
                                    activeValuesFilters={activeFilters}
                                    activeValuesRanges={activeRangeFilters}
                                    rangeFilters={rangeFilters}
                                    resetHandler={this.resetActiveFilters}
                                    filtersLocalizedNames={getFiltersLocalizedNames(filters)}
                                    rangesLocalizedNames={getRangeFiltersLocalizedNames(rangeFilters)}
                                />
                                <SortPanel
                                    foundItems={<FoundItems numberFound={pagination.numFound}/>}
                                    numberMode={sortPanelNumberMode}
                                    sorterMode={sortPanelSorterMode}
                                    isProductsExist={isProductsExist}
                                />
                                <ProductsList
                                    products={items}
                                    selectProductHandler={this.onSelectProductHandler}
                                    currency={currency}
                                    isLoading={!!isLoading}
                                    productsLabeled={productsLabeled}
                                    availableLabels={availableLabels}
                                />
                                <AppPagination pagination={pagination} onChangeHandler={this.handlePagination}/>
                            </Grid>
                        </Grid>
                    </SearchPageContext.Provider>
                </Grid>
            </AppMain>
        );
    }
}
