import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IMainNavigationNode } from '@interfaces/navigations';
import { IRelatedProductDataFixture } from '../fixtures';
import { IIndexSignature } from '@interfaces/common';

export interface ISubNavigationProps extends WithStyles<typeof styles> {
    classes: IIndexSignature;
    nodes: IMainNavigationNode[];
    simpleDrop: boolean;
    productsList: IRelatedProductDataFixture[];
    mainMenuItemId: number | string;
    mainMenuType: string;
    isTouch: boolean;
    headerHeight: number;
}
