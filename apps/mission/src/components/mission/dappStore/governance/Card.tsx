import { useRouter } from "next/router";
import { Button } from "../Button";
import { Card } from "../card/Card";
import { Description } from "../card/Description";
import { Title } from "../card/Title";

export const GovernanceCard = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/governance");
  };

  return (
    <Card>
      <>
        <div>
          <Title firstWord="Evmos" secondWord="Governance" />
          <Description text="Decide on the future of Evmos" />
        </div>
        <Button
          text="Participate in Governance"
          handleOnClick={handleOnClick}
        />
      </>
    </Card>
  );
};
