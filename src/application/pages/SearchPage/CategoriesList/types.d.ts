import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { FilterValue, TLocalizedName } from 'src/shared/interfaces/searchPageData';
import { TCategoryId } from 'src/shared/components/Pages/SearchPage/types';
import { ICategory } from 'src/shared/interfaces/category';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';

export interface ICategoriesListProps extends WithStyles<typeof styles> {
    categories: FilterValue[];
    categoriesTree: ICategory[];
    selectedCategory: TCategoryId;
    localizedName?: TLocalizedName | null;
    locationCategoryId: TCategoryId;
    changeLocation?: (location: string) => void;
    setCurrentCategory?: (categoryId: TCategoryId) => void;
    width?: Breakpoint;
    isOpened: boolean;
    onTitleClick: () => void;
}

export interface ICategoriesListState {
    anchorElement: HTMLElement;
}

export interface IActiveFilterCategories {
    [key: string]: number;
}
