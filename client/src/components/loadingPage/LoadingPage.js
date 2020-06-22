import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingPage() {
  return (
    <div className="loader">
      <CircularProgress />
    </div>
  );
}
