import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { MainLayout } from 'layouts';
import { makeStyles } from '@mui/styles';
import { Grid, Card, CardActionArea, CardContent, Typography, Skeleton, Box, Button } from '@mui/material';
import { useTags } from 'hooks/useTags';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
    container: {
       padding: theme.spacing(3)
    },
    card: {
       height: 170
    }
}))


export default function Tags() {
    const [loading, setLoading] = useState(true)
    const classes = useStyles()
    const { data: tags } = useTags()

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    })

    return (
        <MainLayout title="التصنيفات">
 
            <Head>
                <title>التصنيفات</title>
            </Head>
            <Box sx={{float: 'right', mt: 2}}>
                <Link href={'/tag/create'} passHref>
                    <Button color={'primary'} variant={'contained'} disableElevation size='small'>
                        إضافة التصنيف
                    </Button>
                </Link>
            </Box>
            { loading ? (
                <Grid container spacing={3} className={classes.container}>
                    {
                        tags.map(({ id, name, slug, description }) =>
                            <Grid item sm={4} xs={12} key={id}>
                                <Skeleton animation="wave" variant="rectangular" width={180} height={180} />
                            </Grid>
                        )
                    }
                </Grid>
                ) : (
                    <Grid container spacing={3} className={classes.container}>
                        {
                            tags.map(({ id, name, slug, description }) =>
                                <Grid item sm={4} xs={12} key={id}>
                                    <Link passHref href={`tag/${slug}`}>
                                        <Card variant="outlined">
                                            <CardActionArea>
                                                <CardContent className={classes.card}>
                                                    <Typography variant="h6" color="primary">
                                                        {name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {description}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Grid>
                            )
                        }
                    </Grid>
                )
            }
                
           
 
        </MainLayout>
    )
}