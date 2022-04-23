import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
}));

export default function Content({ html }) {
    const classes = useStyles();
    return (
        <div /* dangerouslySetInnerHTML={{ __html: html }} */ className={classes.root}>
            {html}
        </div>
    );
}