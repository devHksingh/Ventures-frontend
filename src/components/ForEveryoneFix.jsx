import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function ForEveryoneFix() {
  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            For Everyone
          </Typography>
          <Typography color="text.secondary">
            Join our community of innovators and be part of the next big thing in technology.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ForEveryoneFix;
