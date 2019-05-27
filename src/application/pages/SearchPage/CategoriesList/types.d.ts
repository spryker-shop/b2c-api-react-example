import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IFilterValue } from '@interfaces/searchPageData';
import { ICategory } from '@interfaces/common';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';

export interface ICategoriesListProps extends WithStyles<typeof styles> {
    categories: IFilterValue[];
    categoriesTree: ICategory[];
    selectedCategory: number | string;
    selectedMobileCategory: number | string;
    categoriesLocalizedName?: string | null;
    locationCategoryId: number | string;
    push?: (location: string) => void;
    setCurrentCategoryAction?: (categoryId: number | string) => void;
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
