import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@mui/styles';
import { Box, Chip } from '@mui/material'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}))

export default function Tags({ items = [] }) {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            {
                items.map(e =>
                    (
                        <Link href={`/tag/${e.tag.slug}`} passHref key={e.tag.id}>
                           <Chip sx={{ m:0.5 }} label={e.tag.name} color="primary" variant="outlined" />
                        </Link>
                    )
                )
            }
        </Box>
    )
}
