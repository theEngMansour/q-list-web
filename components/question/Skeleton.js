import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';

export default function Facebook({loading, children}) {

  return (
    <div>
      <Card sx={{ maxWidth: '100%', m: 2 }} elevation={0}>
        <CardHeader
          avatar={
            loading && (<Skeleton animation="wave" variant="circular" width={40} height={40} />) 
          }
          title={
            loading && (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            )
          }
          subheader={
            loading && (
              <Skeleton animation="wave" height={10} width="40%" />
            )
          }
        />
        {loading && (
          <Skeleton sx={{ height: 190, width: '100%' }} animation="wave" variant="rectangular" />
        )}
      </Card>
      {!loading && children}
    </div>
  );
}


