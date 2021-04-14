import React, { ReactElement, useState } from 'react';

import { Treatment } from './Treatment';

export function Treatments(): ReactElement {
  const [selectedId, setSelectedId] = useState<number>();
  return <div>{selectedId && <Treatment id={selectedId} />}</div>;
}
