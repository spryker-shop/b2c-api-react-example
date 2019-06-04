import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Grid, Select, MenuItem, FormControl, Typography, InputLabel } from '@material-ui/core';
import { ChevronIcon } from './icons';
import { IMenuItemFirst, ISprykerSelectProps as Props, ISprykerSelectState as State } from './types';
import { styles } from './styles';

class SprykerSelectComponent extends React.Component<Props, State> {
    public static defaultProps = {
        isFullWidth: false
    };

    public readonly state: State = {
        isOpen: false
    };

    protected handleChangeShowing = (): void => this.setState(prev => ({ isOpen: !prev.isOpen }));

    protected getFirstItemTemplate = (): IMenuItemFirst => {
        const { menuItemFirst } = this.props;

        const menuDefaultTemplate = {
            value: ' ',
            name: <FormattedMessage id={ 'first.item.in.select' } />,
            selected: false,
            disabled: false
        };

        return Boolean(menuItemFirst) ? menuItemFirst : menuDefaultTemplate;
    };

    protected getMenuItemFirst = (): JSX.Element => {
        const { classes } = this.props;

        const menuItemsTemplate = this.getFirstItemTemplate();

        return (
            <MenuItem
                value={ menuItemsTemplate.value }
                selected={ menuItemsTemplate.selected }
                disabled={ menuItemsTemplate.disabled }
                disableGutters
                classes={{ selected: classes.selected }}
                className={`${classes.menuItem} ${classes.menuItemPlaceholder}`}
            >
                { menuItemsTemplate.name }
            </MenuItem>
        );
    };

    public render(): JSX.Element {
        const {
            classes,
            currentMode,
            onChangeHandler,
            menuItems,
            name,
            title,
            label,
            isRequired,
            isFullWidth,
            isSimple,
        } = this.props;
        const { isOpen } = this.state;
        const isMenuItemsExist = menuItems.length > 0;
        const isPlaceholderSelected = this.getFirstItemTemplate().value === currentMode;

        const chevronIcon: React.SFC = (): JSX.Element =>
            <span className={`${classes.icon} ${isOpen ? classes.iconOpened : ''}`}><ChevronIcon /></span>;

        return (
            <Grid container justify="center" alignItems="center" className={ classes.root }>
                <Grid item xs={ 12 }>
                    <FormControl required={ isRequired ? isRequired : false } className={ classes.formControl }>
                        { (title && isMenuItemsExist) &&
                            <Typography component="span" className={ classes.title }>
                                { title }
                            </Typography>
                        }

                        { label &&
                            <InputLabel
                                shrink
                                FormLabelClasses={{
                                    root: classes.label,
                                    focused: classes.labelFocused,
                                    asterisk: classes.asterisk
                                }}
                            >
                                { label }
                            </InputLabel>
                        }

                        <Select
                            open={ isOpen }
                            onClose={ this.handleChangeShowing }
                            onOpen={ this.handleChangeShowing }
                            value={ currentMode }
                            onChange={ onChangeHandler }
                            name={ name }
                            MenuProps={{
                                getContentAnchorEl: null,
                                disableAutoFocusItem: true,
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left'
                                },
                                classes: {
                                    paper: classes.menu
                                }
                            }}
                            classes={{
                                root: classes.selectRoot,
                                select: `
                                    ${classes.input}
                                    ${isPlaceholderSelected ? classes.inputPlaceholder : ''}
                                    ${isOpen ? classes.inputFocused : ''}
                                    ${isSimple ? classes.inputSimple : ''}
                                 `
                            }}
                            disableUnderline
                            IconComponent={ chevronIcon }
                            autoWidth={ !isFullWidth }
                        >
                            { this.getMenuItemFirst() }
                            { isMenuItemsExist && menuItems.map(item => (
                                <MenuItem
                                    value={ item.value }
                                    key={ `${item.name}-${item.value}` }
                                    disableGutters
                                    classes={{ selected: classes.selected }}
                                    className={ classes.menuItem }
                                >
                                    <span className={ classes.menuItemText }>{ item.name }</span>
                                </MenuItem>
                            )) }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        );
    }
}

export const SprykerSelect = withStyles(styles)(SprykerSelectComponent);
