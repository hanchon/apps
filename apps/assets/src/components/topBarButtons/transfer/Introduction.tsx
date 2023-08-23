import { EvmosRedIcon } from "icons"
import { Title } from "ui-helpers"

export const Introduction = () => {
    return <section className="flex flex-col space-y-4">
        <EvmosRedIcon />
        {/* add i18 */}
        {/* create h1 and h2 for titles in modal */}
        <Title>Transfer Assets</Title>
        <h2 className="text-gray1 text-sm">Deposit and send assets to any account on any chain.</h2>


    </section>
}