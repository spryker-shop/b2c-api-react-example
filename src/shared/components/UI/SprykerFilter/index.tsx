import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import {styles} from './styles';

export interface IMenuItemsDropdown {
  value: string | number;
  doc_count: string | number;
}

interface SprykerFilterProps extends WithStyles<typeof styles> {
  attributeName?: string;
  handleChange?: Function;
  menuItems?: Array<IMenuItemsDropdown>;
  activeValues?: Array<string>;
}

interface SprykerFilterState {
  isOpen: boolean;
}

export class SprykerFilter extends React.Component<SprykerFilterProps, SprykerFilterState> {

  public state: SprykerFilterState = {
    isOpen: false,
  };

  private handleChangeShowing = (): void => {
    this.setState(prev => ({isOpen: !prev.isOpen}));
  }

  private handleChangeValues = (event: any) => {
    this.props.handleChange(this.props.attributeName, event.target.value);
  }

  private handleDelete = (item: any) => () => {
    const values = [...this.props.activeValues].filter((val) => val !== item);
    this.props.handleChange(this.props.attributeName, values);
  }

  public render() {
    const {
      classes,
      attributeName,
      menuItems,
      activeValues,
    } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <Select
            multiple
            inputProps={{
              name: attributeName,
              id: `${attributeName}-filter`,
            }}
            renderValue={() => attributeName.split('_').join(' ')}
            displayEmpty
            open={this.state.isOpen}
            onClose={this.handleChangeShowing}
            onOpen={this.handleChangeShowing}
            value={activeValues}
            onChange={this.handleChangeValues}
            variant="filled"
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.value}
                value={item.value}
                className={classes.menuItem}
              >
                <span>{item.value}</span>
                <span>{item.doc_count}</span>
              </MenuItem>))
            }
          </Select>
          {activeValues.map(item => (
            <Chip
              key={item}
              label={item}
              variant="outlined"
              onDelete={this.handleDelete(item)}
              className={classes.chip}
            />))
          }
        </FormControl>
      </div>
    );
  }
}

export const SprykerFilterElement = withStyles(styles)(SprykerFilter);
