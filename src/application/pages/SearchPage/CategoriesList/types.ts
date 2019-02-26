import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { FilterValue, TLocalizedName } from '@interfaces/searchPageData';
import { TCategoryId } from '@application/pages/SearchPage/types';
import { ICategory } from '@interfaces/category';

export interface ICategoriesListProps extends WithStyles<typeof styles> {
    categories: FilterValue[];
    categoriesTree: ICategory[];
    selectedCategory: TCategoryId;
    localizedName: TLocalizedName | null;
}

export interface IActiveFilterCategories {
    [key: string]: number;
}
