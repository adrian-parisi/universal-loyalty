import { ActivateDeactivate } from 'components/shared/ActivateDeactivate';
import { LoyaltyCoinCreationSection } from 'components/brand/creation/LoyaltyCoinCreationSection';
import { Divider } from '@mui/material';

export function LoyaltyCoinCreationPage() {
  return (
    <>
      <ActivateDeactivate />
      <Divider />
      <LoyaltyCoinCreationSection />
    </>
  );
}