import * as React from 'react';
import api from '@services/api';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { withStyles, Button, Menu, MenuItem } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { TAppLocale } from '@interfaces/locale';
import { ILangProps as Props, ILangState as State, TLanguage } from './types';
import { styles } from './styles';

const availableLanguages: TLanguage[] = [
    {
        name: <FormattedMessage id={'language.english.title'} />,
        code: 'en'
    },
    {
        name: <FormattedMessage id={'language.deutsch.title'} />,
        code: 'de'
    }
];

@connect
export class LanguageSwitcherComponent extends React.Component<Props, State> {
    public readonly state: State = {
        anchorElement: null
    };

    protected openLanguage = ({currentTarget}: React.MouseEvent<HTMLElement>): void => {
        this.setState({anchorElement: currentTarget});
    };

    protected closeLanguage = (): void => this.setState({anchorElement: null});

    protected selectLanguage = (lang: TLanguage) => (): void => {
        const locale: TAppLocale = lang.code;

        api.setHeader('Accept-Language', locale);
        this.setState({anchorElement: null});
        this.props.switchLocaleAction({locale});
    };

    public render(): JSX.Element {
        const {appLocale} = this.props;
        if (!appLocale) {
            return null;
        }
        const {anchorElement} = this.state;
        const selectedLanguage = availableLanguages.filter((item: TLanguage) => (item.code === appLocale))[0];
        const {classes} = this.props;
        const isOpen = Boolean(anchorElement);
        const languagesList = availableLanguages.map(language => {
            const selectedItem = language.code === selectedLanguage.code;

            return (
                <MenuItem
                    key={language.code}
                    selected={selectedItem}
                    onClick={this.selectLanguage(language)}
                >
                    {language.name}
                </MenuItem>
            );
        });

        return (
            <>
                <Button
                    className={classes.langBtn}
                    size="small"
                    aria-owns={isOpen ? 'lang-menu' : null}
                    aria-haspopup="true"
                    onClick={this.openLanguage}
                >
                    {selectedLanguage.name}
                    {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </Button>

                <Menu
                    id="lang-menu"
                    anchorEl={anchorElement}
                    open={isOpen}
                    onClose={this.closeLanguage}
                >
                    {languagesList}
                </Menu>
            </>
        );
    }
}

export const LanguageSwitcher = withStyles(styles)(LanguageSwitcherComponent);

export default LanguageSwitcher;
