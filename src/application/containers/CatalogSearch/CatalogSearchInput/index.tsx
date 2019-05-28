import * as React from 'react';
import * as qs from 'query-string';
import { connect } from './connect';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { pathSearchPage } from '@constants/routes';
import { TextField, IconButton, withStyles } from '@material-ui/core';
import { SearchIcon } from './icons';
import { IInputComponentProps as Props, IInputComponentState as State } from './types';
import { ICompletionMatch } from '../types';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';

@connect
class CatalogSearchInputComponent extends React.Component<Props, State> {
    public readonly state: State = {
        parts: [],
        matches: []
    };

    public componentDidUpdate = (prevProps: Props): void => {
        if (prevProps.completion !== this.props.completion) {
            this.suggestQuery();
        }
    };

    protected handleFullSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const {
            isLoading,
            sendSearchAction,
            push,
            clearSuggestion,
            currency,
            inputProps: { value }
        } = this.props;
        const minimalLettersAmount = 2;
        const query = { q: value, currency };

        if (!isLoading && value.length > minimalLettersAmount) {
            sendSearchAction(query);

            push(`${pathSearchPage}?${qs.stringify(query)}`);
            clearSuggestion(value);
        }
    };

    protected suggestQuery = (): void => {
        const { completion, inputProps: { value } } = this.props;
        let suggestQuery = value;

        if (completion.length) {
            completion.some((data: string) => {
                if (data.startsWith(suggestQuery.toLowerCase())) {
                    suggestQuery += data.substring(suggestQuery.length);

                    return true;
                }

                return false;
            });
        }
        const matches = match(suggestQuery, value);
        const parts = parse(suggestQuery, matches);

        this.setState({ matches, parts });
    };

    public render(): JSX.Element {
        const { classes } = this.props;
        const { classes: inputClasses, value, ref, extraInputClassName, ...other } = this.props.inputProps;
        const { parts, matches } = this.state;
        const filledClass = !!value.length ? classes.filled : '';

        const highlightedLetters = parts.map((part: ICompletionMatch, index: number) =>
            <span key={ String(index) } className={ classes.suggestedText } >{ part.text }</span>
        );

        return (
            <form action="/" method="GET" onSubmit={ this.handleFullSearch } className="suggestForm">
                <div className={`${classes.completionInput} ${extraInputClassName ? extraInputClassName : ''}`}>
                    { (!!parts.length && !!matches.length) &&
                        highlightedLetters
                    }
                </div>
                <TextField
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        inputRef: node => ref(node),
                        classes: {
                            root: classes.inputRoot,
                            input: `${classes.input} ${extraInputClassName ? extraInputClassName : ''}`
                        },
                        startAdornment: (
                            <IconButton aria-label="Search" type="submit" className={ classes.inputIconContainer }>
                                <SearchIcon />
                            </IconButton>
                        )
                    }}
                    { ...other }
                />
                <span className={ `${classes.placeholder} ${filledClass}` }>
                    <FormattedMessage id={ 'header.form.autosuggest.placeholder' } />
                </span>
            </form>
        );
    }
}

export const CatalogSearchInput = withStyles(styles)(CatalogSearchInputComponent);
