import { ICONS_TYPES } from "constants-helper";
import { useTranslation } from "next-i18next";

import {
  IconContainer,
  PrimaryButton,
  ContainerConfirmation,
  ViewExplorer,
  ConfirmationTitle,
  ConfirmationMessage,
  Divider,
  ContainerItem,
  ConfirmationText,
} from "ui-helpers";

export const Confirmation = () => {
  const { t } = useTranslation();
  return (
    <>
      <ContainerConfirmation>
        <IconContainer type={ICONS_TYPES.BIG_CONFETTI} />
        <ConfirmationTitle>
          {t("transfer.confirmation.message.successful")}
        </ConfirmationTitle>
        <ConfirmationMessage>
          {t("transfer.confirmation.message.successful.description")}
          <br />
          {t("transfer.confirmation.message.successful.description2")}
        </ConfirmationMessage>
        <Divider variant="info" className="w-full">
          {/* TODO: add correct values */}
          <ViewExplorer
            txHash="txhash"
            explorerTxUrl="txurl"
            text="Transaction ID: 0x93lx9dw3"
          />
        </Divider>
        <ContainerItem>
          <ConfirmationText>
            {t("transfer.confirmation.total.amount.sent")}
          </ConfirmationText>
          {/* TODO: add correct value */}
          <p>2900.00 OSMO</p>
        </ContainerItem>
        <ContainerItem>
          <ConfirmationText>
            {t("transfer.confirmation.recipient.address")}
          </ConfirmationText>
          {/* TODO: add correct value */}
          <p>0xFE....23dF</p>
        </ContainerItem>
        <ContainerItem>
          <ConfirmationText>{t("transfer.confirmation.date")}</ConfirmationText>
          {/* TODO: add correct value */}
          <p>Sep 4,2023 11:06AM</p>
        </ContainerItem>
        {/* TODO: add onclick action */}
      </ContainerConfirmation>
      <PrimaryButton
        onClick={() => {}}
        className="w-full text-lg rounded-md capitalize mt-11"
      >
        {t("transfer.confirmation.button.text")}
      </PrimaryButton>
    </>
  );
};
