import { ActivateDeactivate } from '../../shared/ActivateDeactivate';
import { LoyaltyCoinCreationForm } from './LoyaltyCoinCreationForm';
import { SectionDivider } from '../../shared/SectionDivider';
import { SignMessage } from '../../shared/SignMessage';
import { WalletStatus } from '../../shared/WalletStatus';

export function LoyaltyCoinCreationPage() {
  return (
    <>
      <ActivateDeactivate />
      <SectionDivider />
      <WalletStatus />
      <SectionDivider />
      <SignMessage />
      <SectionDivider />
      <LoyaltyCoinCreationForm />
    </>
  );
}