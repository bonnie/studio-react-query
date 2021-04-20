import React, { ReactElement } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export function Loading(): ReactElement {
  // will use React Query `useIsFetching` to determine whether or not to display
  const isFetching = false; // for now, just don't display

  const display = isFetching ? 'inherit' : 'none';

  return (
    <div className="loading-spinner">
      <Spinner animation="border" role="status" style={{ display }}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}
