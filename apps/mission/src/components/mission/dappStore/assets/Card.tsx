import { useRouter } from "next/router";
import { Button } from "../Button";
import { Card } from "../card/Card";
import { Description } from "../card/Description";
import { Title } from "../card/Title";

export const AssetsCard = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/assets");
  };

  return (
    <Card>
      <>
        <div>
          <Title firstWord="Evmos" secondWord="Assets" />
          <Description text="Manage your assets on Evmos" />
        </div>
        <Button text="See Portfolio" handleOnClick={handleOnClick} />
      </>
    </Card>
  );
};
