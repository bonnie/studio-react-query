import React, { ReactElement, useState } from 'react';

import { Treatment } from './Treatment';

export function Treatments(): ReactElement {
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<number>();
  return (
    <div>{selectedTreatmentId && <Treatment id={selectedTreatmentId} />}</div>
  );
}
