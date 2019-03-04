import * as React from 'react';
import { withStyles, MenuItem, FormControl, Select, Chip, Button } from '@material-ui/core';
import { ChevronIcon } from './icons';
import { styles } from './styles';
import { InputChangeEvent } from '@interfaces/common';
import { ISprykerFilterProps as Props, ISprykerFilterState as State } from './types';
import { FormattedMessage } from 'react-intl';

export class SprykerFilter extends React.Component<Props, State> {
    protected resetButtonRef: React.RefObject<HTMLLIElement> = React.createRef();

    public state: State = {
        isOpen: false
    };

    protected handleChangeShowing = (event: React.ChangeEvent<{}>): void => {
        if (this.state.isOpen === true) {
            if (this.props.handleClose) {
                this.props.handleClose(event);
            }
        }

        this.setState(prev => ({ isOpen: !prev.isOpen }));
    };

    protected handleChangeValues = (event: InputChangeEvent): void => {
        if (this.resetButtonRef.current !== event.currentTarget) {
            this.props.handleChange(this.props.attributeName, event.target.value);
        }
    };

    protected handleDelete = (item: string) => (): void => {
        const values = [...this.props.activeValues].filter(val => val !== item);
        this.props.handleChange(this.props.attributeName, values);
    };

    protected handleResetValues = (): void => {
        this.props.handleChange(this.props.attributeName, []);
    };

    public render(): JSX.Element {
        const {
            classes,
            attributeName,
            menuItems,
            activeValues,
            isShowSelected,
            title
        } = this.props;
        const { isOpen } = this.state;

        const chevronIcon: React.SFC = (): JSX.Element => <span className={ classes.icon }><ChevronIcon /></span>;

        return (
            <div className={ classes.root }>
                <FormControl className={ classes.formControl }>
                    <Select
                        multiple
                        inputProps={{
                            name: attributeName,
                            id: `${attributeName}-filter`
                        }}
                        renderValue={
                            title ? () => title : () => attributeName ? attributeName.split('_').join(' ') : ''
                        }
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
                        autoWidth
                        displayEmpty
                        open={ isOpen }
                        onClose={ this.handleChangeShowing }
                        onOpen={ this.handleChangeShowing }
                        onChange={ this.handleChangeValues }
                        value={ activeValues }
                        disableUnderline={ true }
                        IconComponent={ chevronIcon }
                        classes={{
                            root: classes.selectRoot,
                            select: classes.input
                        }}
                    >
                        { isShowSelected &&
                            <li className={ classes.menuCounter } ref={ this.resetButtonRef }>
                                <span className={ classes.menuCounterText }>
                                    {`${activeValues.length} `}
                                    <FormattedMessage id={ 'word.selected.title' } />
                                </span>
                                <span>
                                    <Button
                                        className={ classes.resetBtn }
                                        variant="text"
                                        classes={{
                                            disabled: classes.disabled
                                        }}
                                        onClick={ this.handleResetValues }
                                        disabled={ !Boolean(activeValues.length) }
                                    >
                                        <FormattedMessage id={'word.reset.title'} />
                                    </Button>
                                </span>
                            </li>
                        }
                        { menuItems.map(item => (
                            <MenuItem
                                key={ item.value }
                                value={ item.value }
                                className={ classes.menuItem }
                                disableGutters
                                classes={{
                                    selected: classes.selected
                                }}
                            >
                                <span className={ classes.menuItemName }>{ item.value }</span>
                                <span>({ item.doc_count })</span>
                            </MenuItem>))
                        }
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export const SprykerFilterElement = withStyles(styles)(SprykerFilter);
