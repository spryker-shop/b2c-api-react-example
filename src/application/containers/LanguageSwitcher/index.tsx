import * as React from 'react';
import { api } from '@services/api';
import { connect } from './connect';
import { availableLanguages } from './fixtures';
import { withStyles, Button, Menu, MenuItem } from '@material-ui/core';
import { ChevronIcon } from './icons';
import { ILangProps as Props, ILangState as State, TLanguage } from './types';
import { styles } from './styles';

@connect
class LanguageSwitcherComponent extends React.Component<Props, State> {
    public readonly state: State = {
        anchorElement: null
    };

    protected openLanguage = ({ currentTarget }: React.MouseEvent<HTMLElement>): void => {
        this.setState({ anchorElement: currentTarget });
    };

    protected closeLanguage = (): void => this.setState({ anchorElement: null });

    protected selectLanguage = (lang: TLanguage) => (): void => {
        const { appLocale } = this.props;
        const locale: string | null = lang.code;
        const shouldUpdateLocale = locale !== appLocale;

        this.setState({ anchorElement: null });

        if (shouldUpdateLocale) {
            api.setHeader('Accept-Language', locale);
            this.props.switchLocaleAction({ locale });
        }
    };

    public render(): JSX.Element {
        const { appLocale } = this.props;
        if (!appLocale) {
            return null;
        }
        const { anchorElement } = this.state;
        const selectedLanguage = availableLanguages.filter((item: TLanguage) => (item.code === appLocale))[0];
        const { classes } = this.props;
        const isOpen = Boolean(anchorElement);
        const languagesList = availableLanguages.map(language => {
            const selectedItem = language.code === selectedLanguage.code;

            return (
                <MenuItem
                    key={ language.code }
                    selected={ selectedItem }
                    onClick={ this.selectLanguage(language) }
                >
                    { language.name }
                </MenuItem>
            );
        });

        return (
            <>

                <Button
                    className={ classes.langBtn }
                    aria-owns={ isOpen ? 'lang-menu' : null }
                    aria-haspopup="true"
                    onClick={ this.openLanguage }
                >
                    <span className={ classes.langBtnInner }>
                        <span className={ classes.langBtnText }>{ selectedLanguage.name }</span>
                        <span className={`${classes.icon} ${isOpen ? classes.iconOpened : ''}`} >
                             <ChevronIcon />
                        </span>
                    </span>
                </Button>
                {anchorElement &&
                    <Menu
                        id="lang-menu"
                        anchorEl={ anchorElement }
                        open={ isOpen }
                        onClose={ this.closeLanguage }
                        className={classes.content}
                        classes={{
                            paper: classes.content
                        }}
                    >
                        { languagesList }
                    </Menu>
                }
            </>
        );
    }
}

export const LanguageSwitcher = withStyles(styles)(LanguageSwitcherComponent);
