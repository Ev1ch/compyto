import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

export default function Palette() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h2">Palette</Typography>
      <Grid
        sx={{
          height: '100%',
        }}
        spacing={3}
        container
      >
        <Grid xs={6} item>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h3">Lizard</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} item>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h3">Lizard</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} item>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h3">Lizard</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} item>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h3">Lizard</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} item>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h3">Lizard</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} item>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h3">Lizard</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} item>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h3">Lizard</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} item>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h3">Lizard</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
