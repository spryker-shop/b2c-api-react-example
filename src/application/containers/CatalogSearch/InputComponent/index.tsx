import * as React from 'react';
import * as qs from 'query-string';
import { connect } from './connect';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { pathSearchPage } from '@constants/routes';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { IInputComponentProps as Props, IInputComponentState as State } from './types';
import { ICompletionMatch } from '../types';

@connect
export class InputComponent extends React.Component<Props, State> {
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
            inputProps: {value}
        } = this.props;
        const minimalLettersAmount = 2;
        const query = {q: value, currency};

        if (!isLoading && value.length > minimalLettersAmount) {
            sendSearchAction(query);

            push(`${pathSearchPage}?${qs.stringify(query)}`);
            clearSuggestion(value);
        }
    };

    protected suggestQuery = (): void => {
        const {completion, inputProps: {value}} = this.props;
        let suggestQuery = value;

        if (completion.length) {
            completion.some((data: string) => {
                if (data.startsWith(suggestQuery.toLowerCase())) {
                    suggestQuery = data;

                    return true;
                }

                return false;
            });
        }
        const matches = match(suggestQuery, value);
        const parts = parse(suggestQuery, matches);

        this.setState({matches, parts});
    };

    public render(): JSX.Element {
        const {classes, ref, ...other} = this.props.inputProps;
        const {parts, matches} = this.state;

        const highlightedLetters = parts.map((part: ICompletionMatch, index: number) => part.highlight
            ? <span key={String(index)} className={classes.hiddenPart}>{part.text}</span>
            : <strong key={String(index)} className={classes.visiblePart}>{part.text}</strong>
        );

        return (
            <form action="/" method="GET" onSubmit={this.handleFullSearch} className="suggestForm">
                <div className={classes.completionInput}>
                    {(!!parts.length && !!matches.length) &&
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
                            formControl: classes.formControl,
                            notchedOutline: classes.inputOutline,
                            input: classes.input
                        },
                        startAdornment: (
                            <InputAdornment position="start" classes={{root: classes.inputIconContainer}}>
                                <IconButton aria-label="Search" type="submit">
                                    <SearchIcon classes={{root: classes.inputIcon}} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    {...other}
                />
            </form>
        );
    }
}
