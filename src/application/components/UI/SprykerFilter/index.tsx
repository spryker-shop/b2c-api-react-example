import * as React from 'react';
import { withStyles, MenuItem, FormControl, Select, Chip } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { styles } from './styles';
import { InputChangeEvent } from '@interfaces/common';
import { ISprykerFilterProps as Props, ISprykerFilterState as State } from './types';

export class SprykerFilter extends React.Component<Props, State> {
    public state: State = {
        isOpen: false,
    };

    private handleChangeShowing = (event: React.ChangeEvent<{}>): void => {

        if (this.state.isOpen === true) {
            if (this.props.handleClose) {
                this.props.handleClose(event);
            }
        }

        this.setState(prev => ({isOpen: !prev.isOpen}));
    };

    private handleChangeValues = (event: InputChangeEvent) => {
        this.props.handleChange(this.props.attributeName, event.target.value);
    };

    private handleDelete = (item: string) => () => {
        const values = [...this.props.activeValues].filter(val => val !== item);
        this.props.handleChange(this.props.attributeName, values);
    };

    public render() {
        const {
            classes,
            attributeName,
            menuItems,
            activeValues,
            extraClassName,
            isShowSelected,
            title,
        } = this.props;

        return (
            <div className={extraClassName ? `${classes.root} ${extraClassName}` : classes.root}>
                <FormControl className={classes.formControl}>
                    <Select
                        multiple
                        inputProps={{
                            name: attributeName,
                            id: `${attributeName}-filter`,
                        }}
                        renderValue={
                            title ? () => title : () => attributeName ? attributeName.split('_').join(' ') : ''
                        }
                        displayEmpty
                        open={this.state.isOpen}
                        onClose={this.handleChangeShowing}
                        onOpen={this.handleChangeShowing}
                        value={activeValues}
                        onChange={this.handleChangeValues}
                        disableUnderline={true}
                        IconComponent={ChevronLeft}
                        classes={{
                            icon: classes.icon,
                            select: classes.input,
                        }}
                    >
                        {menuItems.map(item => (
                            <MenuItem
                                key={item.value}
                                value={item.value}
                                className={classes.menuItem}
                                disableGutters
                                classes={{
                                    selected: classes.selected,
                                }}
                            >
                                <span className={classes.menuItemName}>{item.value}</span>
                                <span>({item.doc_count})</span>
                            </MenuItem>))
                        }
                    </Select>
                    {isShowSelected
                        ? activeValues.map(item => (
                            <Chip
                                key={item}
                                label={item}
                                variant="outlined"
                                onDelete={this.handleDelete(item)}
                                className={classes.chip}
                            />))
                        : null
                    }
                </FormControl>
            </div>
        );
    }
}

export const SprykerFilterElement = withStyles(styles)(SprykerFilter);
