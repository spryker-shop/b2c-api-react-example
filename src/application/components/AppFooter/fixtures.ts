import { TNavigationItem } from './NavigationList/types';
import {
    pathCategoryComputers,
    pathCategoryNew,
    pathCategoryNotebooks,
    pathCategorySale,
    pathCategoryTablets,
    pathCategoryWorkstations
} from '@constants/routes';

export const categoriesLinks: TNavigationItem[] = [
    {
        name: 'category.name.computers',
        path: pathCategoryComputers,
    },
    {
        name: 'category.name.notebooks',
        path: pathCategoryNotebooks,
    },
    {
        name: 'category.name.workstations',
        path: pathCategoryWorkstations,
    },
    {
        name: 'category.name.tablets',
        path: pathCategoryTablets,
    },
    {
        name: 'category.name.sale',
        path: pathCategorySale,
    },
    {
        name: 'category.name.new',
        path: pathCategoryNew,
    },
];

export const socialMediaLinks: TNavigationItem[] = [
    {
        name: 'social.instagram.title',
        path: 'https://www.instagram.com/spryker/',
    },
    {
        name: 'social.youTube.title',
        path: 'https://www.youtube.com/channel/UC6lVOEbqXxUh0W5FMTvlPDQ',
    },
    {
        name: 'social.facebook.title',
        path: 'https://www.facebook.com/Spryker/',
    },
    {
        name: 'social.twitter.title',
        path: 'https://twitter.com/sprysys',
    },
    {
        name: 'social.linkedin.title',
        path: 'https://www.linkedin.com/company/spryker-systems-gmbh',
    },
    {
        name: 'social.xing.title',
        path: 'https://www.xing.com/companies/sprykersystemsgmbh',
    },
];
