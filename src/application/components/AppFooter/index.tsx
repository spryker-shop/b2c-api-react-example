import * as React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavigationList } from './NavigationList';
import { PartnerLogos } from './PartnerLogos';
import { categoriesLinks, socialMediaLinks } from './fixtures';
import { AppLogo } from '@application/components/AppLogo';
import { IAppFooterProps as Props } from './types';
import { styles } from './styles';
import { LanguageSwitcher } from '@application/containers/LanguageSwitcher';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';

export const AppFooterComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes } = props;

    return (
        <div className={ classes.footer }>
            <div className={ classes.container }>
                <div className={ classes.navigation }>
                    <div className={ classes.row }>
                        <div className={ `${classes.col} ${classes.colLogo}` }>
                            <div className={ classes.logo }>
                                <AppLogo />
                            </div>
                        </div>
                        <div className={ `${classes.col} ${classes.colNavigation}` }>
                            <div className={ classes.row }>
                                <div className={ classes.col }>
                                    <NavigationList
                                        title="categories.panel.title"
                                        navigationList={ categoriesLinks }
                                    />
                                </div>
                                <div className={ classes.col }>
                                    <NavigationList
                                        title="social.media.title"
                                        navigationList={ socialMediaLinks }
                                        external
                                    />
                                </div>
                                <div className={ classes.col }>
                                    <ErrorBoundary>
                                        <LanguageSwitcher />
                                    </ErrorBoundary>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ classes.row }>
                    <div className={ classes.col }>
                        <span className={ classes.copyrights }>
                            <FormattedHTMLMessage id={ 'spryker.name.title' } />
                        </span>
                    </div>
                    <div className={ classes.col }>
                        <PartnerLogos />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AppFooter = withStyles(styles)(AppFooterComponent);
