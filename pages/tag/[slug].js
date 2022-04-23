import React from 'react';
import QList from 'components/QList';
import Pages from 'components/Pages';
import Link from 'next/link';
import Head from 'next/head';
import prisma from 'lib/prisma';
import { FormattedMessage } from 'react-intl';
import { MainLayout } from 'layouts';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { Button, Box, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    titleContainer: {
      display: 'flex',
      padding: theme.spacing(2),
      background: theme.palette.background.title
    },
    title: {
      flexGrow: 1,
    },
    container: {
      padding: theme.spacing(3)
    },
    card: {
        height: 170
    }
}))


export default function Show({params: tag}) {
  const classes = useStyles()
  const router = useRouter();

  return (
    <MainLayout>
      <Head>
        <title>{tag?.name}</title>
      </Head>
      <Box className={classes.titleContainer}>
        <Typography variant="h5" className={classes.title}>
          {tag?.name}
        </Typography>
      </Box>
 
      <Grid container spacing={3} className={classes.container}>
        {
          tag?.posts.map((e) =>
            <Grid item sm={4} xs={6} key={e.id}>
              <Link passHref href={`/question/${e.post.id}`}>
                  <Card variant="outlined">
                    <CardActionArea>
                      <CardContent className={classes.card}>
                        <Typography variant="h6" color="primary">
                          {e.post.title.substr(0,100)}
                        </Typography>
                        <Typography variant="body2">
                          {e.post.content.substr(0,200)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
              </Link>
            </Grid>
          )
        }
      </Grid>
    </MainLayout>
  );
}


// Server 
export async function getStaticPaths() {
  const items = await prisma.tag.findMany()
  const paths = items.map(e => ({params: {slug: e.slug.toString()}}))
  return {
      paths,
      fallback: true // Reload any id new for post added
  }
}

export async function getStaticProps({params}) {
  const item = await prisma.tag.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      posts: { select: { post: true } }
    }
  })
  return {
      props: {
          params: JSON.parse(JSON.stringify(item))
      }
  }
}