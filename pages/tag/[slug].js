import React from 'react';
import { useEffect, useContext } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import prisma from 'lib/prisma';
import { MainLayout } from 'layouts';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import useTag from 'hooks/useTags'
import { StateContext } from './../StateContext';
import { useSWRConfig } from 'swr';

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


export default function Show({params}) {
  const classes = useStyles()
  const router = useRouter();
  const {data: tag} = useTag(params?.slug)
  const {mutate} = useSWRConfig()

  // useContext Reload page when update Answer
  const {reloading, setReloading} = useContext(StateContext)

  useEffect(() => {
    if (!params?.id) Router.push('/404')
    mutate(`/api/tag/${params?.slug}`)
    //Update page when Added new answer
    if(reloading){ 
      setTimeout(() => {
          setReloading(false)
      }, 1000);
    }
  }, [params, reloading])

  return (
    <MainLayout>
      <Head>
        <title>{tag?.item.name}</title>
      </Head>
      <Box className={classes.titleContainer}>
        <Typography variant="h5" className={classes.title}>
          {tag?.item.name}
        </Typography>
      </Box>
 
      <Grid container spacing={3} className={classes.container}>
        {
          tag?.item.posts.map((e) =>
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
    }
  })
  return {
      props: {
          params: JSON.parse(JSON.stringify(item))
      }
  }
}