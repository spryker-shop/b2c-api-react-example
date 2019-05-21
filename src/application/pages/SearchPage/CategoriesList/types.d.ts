import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { FilterValue } from 'src/shared/interfaces/searchPageData';
import { ICategory } from 'src/shared/interfaces/category';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';

export interface ICategoriesListProps extends WithStyles<typeof styles> {
    categories: FilterValue[];
    categoriesTree: ICategory[];
    selectedCategory: number | string;
    selectedMobileCategory: number | string;
    localizedName?: string | null;
    locationCategoryId: number | string;
    changeLocation?: (location: string) => void;
    setCurrentCategory?: (categoryId: number | string) => void;
    width?: Breakpoint;
    isOpened: boolean;
    onTitleClick: () => void;
    onItemClickHandler: (categoryId: number) => void;
}

export interface ICategoriesListState {
    anchorElement: HTMLElement;
}

export interface IActiveFilterCategories {
    [key: string]: number;
}
