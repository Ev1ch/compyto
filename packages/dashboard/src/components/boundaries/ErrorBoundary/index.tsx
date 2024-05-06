import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import { Component, ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface State {
  error?: Error;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  State
> {
  public state: State = {};

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public refreshPage = () => {
    window.location.reload();
  };

  public handleRefresh = () => {
    this.refreshPage();
  };

  public render() {
    if (this.state.error) {
      return (
        <Paper
          sx={{
            bgcolor: 'background.paper',
            minWidth: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Alert
            sx={{
              width: 600,
              '.MuiAlert-message': {
                flexGrow: 1,
              },
            }}
            variant="outlined"
            severity="error"
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <AlertTitle>
                An unexpected application-level error occurred
              </AlertTitle>
              <Typography sx={{ mb: 1 }}>
                The error was raised with message: {this.state.error.message}
              </Typography>
              <Button
                onClick={this.handleRefresh}
                sx={{ mx: 'auto' }}
                color="error"
              >
                Refresh page
              </Button>
            </Box>
          </Alert>
        </Paper>
      );
    }

    return this.props.children;
  }
}
