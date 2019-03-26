import { ICategoriesTeasersData } from './types';
import {
    pathCategoryComputers,
    pathCategoryNotebooks,
    pathCategoryTablets,
    pathCategoryWorkstations
} from '@constants/routes';
const computersSrc = require('./img/computers.jpg');
const notebooksSrc = require('./img/notebooks.png');
const tabletsSrc = require('./img/tablets.png');
const workstationsSrc = require('./img/workstations.jpg');

export const categoriesTeasersData: ICategoriesTeasersData[] = [
    {
        title: 'category.name.computers',
        text: 'category.intro.computers',
        img: computersSrc,
        path: pathCategoryComputers,
        linkTitle: 'home.page.computers.button.title',
    },
    {
        title: 'category.name.notebooks',
        text: 'category.intro.notebooks',
        img: notebooksSrc,
        path: pathCategoryNotebooks,
        linkTitle: 'home.page.notebooks.button.title',
        transparentImage: true
    },
    {
        title: 'category.name.tablets',
        text: 'category.intro.tablets',
        img: tabletsSrc,
        path: pathCategoryTablets,
        linkTitle: 'home.page.tablets.button.title',
        differentBg: true,
        transparentImage: true
    },
    {
        title: 'category.name.workstations',
        text: 'category.intro.workstations',
        img: workstationsSrc,
        path: pathCategoryWorkstations,
        linkTitle: 'home.page.workstations.button.title',
    },
];
