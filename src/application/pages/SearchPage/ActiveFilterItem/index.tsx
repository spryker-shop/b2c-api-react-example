import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Chip from '@material-ui/core/Chip';
import { CloseOutlined } from '@material-ui/icons';

import { styles } from './styles';
import { SearchPageContext } from '../context';
import { IActiveFilterItemProps } from './types';

export const ActiveFilterItemBase: React.SFC<IActiveFilterItemProps> = props => {
    const {
        classes,
        value,
        name,
        label,
        type,
        rangeSubType,
    } = props;

    return (

        <SearchPageContext.Consumer>
            {({deleteActiveFilterHandler}) => (
                <Chip
                    label={label}
                    variant="outlined"
                    className={classes.chip}
                    onDelete={deleteActiveFilterHandler({name, value, type, rangeSubType})}
                    deleteIcon={<CloseOutlined className={classes.close}/>}
                    classes={{label: classes.label}}
                />
            )}
        </SearchPageContext.Consumer>
    );
};

export const ActiveFilterItem = withStyles(styles)(ActiveFilterItemBase);
