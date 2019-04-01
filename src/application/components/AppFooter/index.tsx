import * as React from 'react';
import { connect } from './connect';
import { FormattedHTMLMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavigationList } from './NavigationList';
import { PartnerLogos } from './PartnerLogos';
import { socialMediaLinks } from './fixtures';
import { AppLogo } from '@application/components/AppLogo';
import { IAppFooterProps as Props } from './types';
import { styles } from './styles';
import { LanguageSwitcher } from '@application/containers/LanguageSwitcher';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { pathCategoryNew, pathCategoryPageBase, pathCategorySale, } from '@constants/routes';
import { TNavigationItem } from '@components/AppFooter/NavigationList/types';
import { ICategory } from '@interfaces/category';

const AppFooterComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, categoriesTree } = props;

    const getCategoriesTree = (): TNavigationItem[] => {
        if (!Boolean(categoriesTree.length)) {
            return [];
        }

        const commonItems: TNavigationItem[] = [
            {
                name: 'category.name.sale',
                path: pathCategorySale,
                formatted: true
            },
            {
                name: 'category.name.new',
                path: pathCategoryNew,
                formatted: true
            }
        ];

        const parsedCategories = categoriesTree.map((category: ICategory) => ({
            name: category.name,
            path: `${pathCategoryPageBase}/${category.nodeId}`
        }));

        return parsedCategories.concat(commonItems);
    };

    return (
        <div className={ classes.footer }>
            <div className={ classes.container }>
                <div className={ classes.navigation }>
                    <div className={ classes.row }>
                        <div className={`${classes.col} ${classes.colLogo}`}>
                            <div className={ classes.logo }>
                                <AppLogo addSimpleLogo />
                            </div>
                            <span className={`${classes.copyrights} ${classes.copyrightsIsHiddenOnDektop}`}>
                                <FormattedHTMLMessage id={ 'spryker.name.title' } />
                            </span>
                        </div>
                        <div className={`${classes.col} ${classes.colNavigation}`}>
                            <div className={ classes.row }>
                                <div className={`${classes.col} ${classes.colNavigationList}`}>
                                    <NavigationList
                                        title="categories.panel.title"
                                        navigationList={ getCategoriesTree() }
                                    />
                                </div>
                                <div className={`${classes.col} ${classes.colNavigationList}`}>
                                    <NavigationList
                                        title="social.media.title"
                                        navigationList={ socialMediaLinks }
                                        external
                                    />
                                </div>
                                <div className={`${classes.col} ${classes.colLanguage}`}>
                                    <ErrorBoundary>
                                        <LanguageSwitcher />
                                    </ErrorBoundary>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ classes.row }>
                    <div className={`${classes.col} ${classes.IsHiddenOnTablet}`}>
                        <span className={`${classes.copyrights} ${classes.copyrightsIsHiddenOnTablet}`}>
                            <FormattedHTMLMessage id={ 'spryker.name.title' } />
                        </span>
                    </div>
                    <div className={`${classes.col} ${classes.colLogos}`}>
                        <PartnerLogos />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AppFooter = connect(withStyles(styles)(AppFooterComponent));
