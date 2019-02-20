import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CartItemProps } from './types';
import { SquareImage } from '@application/components/SquareImage';
import { AppPrice } from '@application/components/AppPrice';
import { ListItem, IconButton, MenuItem, TextField, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { styles } from './styles';

const CartItemComponent: React.SFC<CartItemProps> = (
    {
        classes,
        parentClasses,
        sku,
        image,
        quantity,
        quantities,
        superAttributes,
        imageItemHeight,
        calculations,
        handleDeleteItem,
        handleChangeQty
    }
) => (
    <ListItem
        key={ sku }
        disableGutters
        divider
        className={ classes.root }
    >
        <SquareImage
            image={ image }
            size={ imageItemHeight }
            alt={ name }
        />
        <div className={ parentClasses.itemWrapper }>
            <div className={ classes.itemName }>{ name }</div>
            { superAttributes
                ? superAttributes.map((attr: { [ key: string ]: string }, idx: number) => (
                    <div key={ `${sku}-attr-${idx}` }
                         className={ `${classes.itemAttr} ${classes.textCapitalize}` }>
                        <span>{ Object.keys(attr)[ 0 ].split('_').join(' ') }</span>
                        <span style={ { marginRight: '5px' } }>:</span>
                        <span>{ Object.values(attr)[ 0 ] }</span>
                    </div>
                ))
                : null
            }
            <div>
                <span className={ `${classes.itemAttr} ${classes.remove}` }>
                    <FormattedMessage id={ 'remove.button.title' } />
                </span>
                <IconButton onClick={ () => handleDeleteItem(sku) }>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>

        <form
            noValidate
            autoComplete="off"
            className={ parentClasses.quantityForm }
        >
            <TextField
                required
                select
                name={sku}
                value={quantity}
                onChange={ handleChangeQty }
                variant="outlined"
                SelectProps={{
                    SelectDisplayProps: {className: classes.select},
                }}
            >
                {
                    quantities.map((i: number) => (
                        <MenuItem
                            value={i}
                            key={`qty-${sku}-${i}`}
                        >{i}</MenuItem>
                    ))
                }
            </TextField>
        </form>

        <div className={ parentClasses.priceWrapper }>
            <div className={classes.sumWrapper}>
                <AppPrice value={calculations.sumPriceToPayAggregation}
                          extraClassName={classes.mainCurrency}/>
            </div>
            {quantity > 1
                ? (
                    <div className={classes.itemAttr}>
                        <span>(</span>
                        <AppPrice
                            value={calculations.unitPriceToPayAggregation}
                            extraClassName={`${classes.itemAttr} ${classes.eachCurrency}`}
                        />
                        <span> <FormattedMessage id={ 'word.each.title' } />)</span>
                    </div>
                ) : null
            }
        </div>
    </ListItem>
);

export const CartItem = withStyles(styles)(CartItemComponent);
