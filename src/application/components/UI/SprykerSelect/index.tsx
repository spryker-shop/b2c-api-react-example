import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Grid, Select, MenuItem, FormControl, Typography, InputLabel } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { styles } from './styles';
import { ISprykerSelectProps as Props } from './types';

export const SprykerSelectBase: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        currentMode,
        changeHandler,
        menuItems,
        name,
        menuItemFirst = {
            // Do not change default value!!!!
            value: ' ',
            name: <FormattedMessage id={ 'first.item.in.select' } />,
            selected: false,
            disabled: false,
        },
        title,
        label,
        extraLabelClassName,
        isRequired,
        isFullWidth,
        extraTitleClassName,
        selectClassName,
        menuItemClassName,
        extraRootClassName,
        extraFormControlClassName,
        extraInputRootClassName,
        extraSelectFieldClassName,
    } = props;

    const getMenuItemFirst = () => {
        if (!menuItemFirst) {
            return null;
        }

        return (
            <MenuItem
                value={menuItemFirst.value}
                selected={menuItemFirst.selected}
                disabled={menuItemFirst.disabled}
                disableGutters
                classes={{
                    selected: classes.selected,
                }}
                className={classes.menuItem}
            >
                {menuItemFirst.name}
            </MenuItem>
        );
    };

    const isMenuItemsExist = (menuItems.length > 0);
    let selectClassNames: string = `spryker-select ${classes.menuItem}`;
    if (extraSelectFieldClassName) {
        selectClassNames += ` ${extraSelectFieldClassName}`;
    }

    return (
        <Grid container
              justify="center"
              alignItems="center"
              className={`${classes.root} ${extraRootClassName ? extraRootClassName : ''}`}
        >
            <Grid item xs={12}>
                <FormControl
                    required={isRequired ? isRequired : false}
                    className={`${classes.formControl} ${extraFormControlClassName ? extraFormControlClassName : ''}`}
                >
                    {(title && isMenuItemsExist)
                        ? <Typography
                            component="span"
                            className={`${classes.title} ${extraTitleClassName ? extraTitleClassName : ''}`}
                        >
                            {title}
                        </Typography>
                        : null
                    }

                    {label
                        ? <InputLabel
                            shrink
                            classes={{root: `${classes.label} ${extraLabelClassName ? extraLabelClassName : ''}`}}
                        >
                            {label}
                        </InputLabel>
                        : null
                    }

                    <Select
                        value={currentMode}
                        onChange={changeHandler}
                        name={name}
                        classes={{
                            root: `${classes.inputRoot} ${extraInputRootClassName ? extraInputRootClassName : ''}`,
                            icon: classes.icon,
                            select: `${classes.input} ${selectClassName ? selectClassName : ''}`,
                        }}
                        disableUnderline={true}
                        IconComponent={ChevronLeft}
                        fullWidth={isFullWidth ? isFullWidth : false}
                        className={selectClassNames}
                    >
                        {getMenuItemFirst()}
                        {isMenuItemsExist && menuItems.map(item => (
                            <MenuItem
                                value={item.value}
                                key={`${item.name}-${item.value}`}
                                disableGutters
                                classes={{
                                    selected: classes.selected,
                                }}
                                className={`${classes.menuItem} ${menuItemClassName ? menuItemClassName : ''}`}
                            >
                                {item.name}
                            </MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export const SprykerSelect = withStyles(styles)(SprykerSelectBase);
