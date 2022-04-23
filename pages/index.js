import React from 'react';
import QList from 'components/QList';
import Pages from 'components/Pages';
import Link from 'next/link';
import Head from 'next/head';
import { FormattedMessage } from 'react-intl';
import { MainLayout } from 'layouts';
import { usePosts } from 'hooks/usePost';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { ButtonGroup, Button, Box, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    padding: theme.spacing(2),
    background: theme.palette.background.title
  },
  title: {
    flexGrow: 1,
  }
}))

export default function Index() {
  const classes = useStyles()
  const router = useRouter();
  const page = router.query.page || 1;
  const sort = router.query.sort || "asc";
  const { data, error, loading } = usePosts({page, sort})

  
  return (
    <MainLayout>
      <Head>
        <title>كـيو ليست | QList</title>
      </Head>
      <Link href={'/tag'} passHref>
        <Button color={'primary'} variant={'contained'} disableElevation size='small'>
          التصنيفات
        </Button>
      </Link>
      <Box className={classes.titleContainer}>
        <Typography variant="h5" className={classes.title}>
          <Filters/>
        </Typography>
        <Box marginY={'auto'}>
          <Link href={'/question/ask'} passHref>
            <Button color={'primary'} variant={'contained'} disableElevation size='small'>
              <FormattedMessage id='btn.ask'/>
            </Button>
          </Link>
        </Box>
      </Box>
      <QList items={data?.items || []} />
      <Pages count={data?.pages} page={Number(page)} />
    </MainLayout>
  );
}

function Filters() {
  const router = useRouter()
  const navigate = (sort) => {
    router.push({
      pathname: '/',
      query: {...router.query, sort}
    })
  }
  return (
    <ButtonGroup size='small'>
      <Button onClick={() => navigate("asc")}>
        <FormattedMessage id={'btn.newest'}/>
      </Button>
      <Button onClick={() => navigate("desc")}>
        <FormattedMessage id={'btn.oldest'}/>
      </Button>
    </ButtonGroup>
  )
}