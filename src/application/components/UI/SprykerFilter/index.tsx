import * as React from 'react';
import { withStyles, MenuItem, FormControl, Select, Button } from '@material-ui/core';
import { ChevronIcon } from './icons';
import { styles } from './styles';
import { InputChangeEvent } from '@interfaces/common';
import { ISprykerFilterProps as Props, ISprykerFilterState as State } from './types';
import { FormattedMessage } from 'react-intl';

class SprykerFilterComponent extends React.Component<Props, State> {
    protected resetItemRef: React.RefObject<HTMLLIElement> = React.createRef();

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
        const menuItemElement: unknown = event.currentTarget as unknown;
        if (this.resetItemRef.current !== menuItemElement as HTMLLIElement) {
            this.props.handleChange(this.props.attributeName, event.target.value);
        }
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
            title,
            isFullWidth
        } = this.props;
        const { isOpen } = this.state;

        const chevronIcon: React.SFC = (): JSX.Element =>
            <span className={`${classes.icon} ${isOpen ? classes.iconOpened : ''}`}><ChevronIcon /></span>;

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
                        autoWidth={ isFullWidth }
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
                            select: `${classes.input} ${isOpen ? classes.inputFocused : ''}`
                        }}
                    >
                        { isShowSelected &&
                            <li className={ classes.menuCounter } ref={ this.resetItemRef }>
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
                            </MenuItem>
                        )) }
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export const SprykerFilter = withStyles(styles)(SprykerFilterComponent);
