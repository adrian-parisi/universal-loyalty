import { ActivateDeactivate } from 'components/shared/ActivateDeactivate';
import { LoyaltyCoinCreationSection } from 'components/brand/creation/LoyaltyCoinCreationSection';
import { SectionDivider } from 'components/shared/StyledComponents';
import { WalletStatus } from 'components/shared/WalletStatus';

export function LoyaltyCoinCreationPage() {
  return (
    <>
      <ActivateDeactivate />
      <SectionDivider />
      <WalletStatus />
      <SectionDivider />
      <LoyaltyCoinCreationSection />
    </>
  );
}