import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IMainNavigationNode } from '@interfaces/navigations';
import { IRelatedProductDataFixture } from '../fixtures';

export interface ISubNavigationProps extends WithStyles<typeof styles> {
    classes: {
        [key: string]: string
    };
    nodes: IMainNavigationNode[];
    simpleDrop: boolean;
    productsList: IRelatedProductDataFixture[];
}
