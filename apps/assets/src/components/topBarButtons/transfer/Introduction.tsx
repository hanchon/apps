import { EvmosRedIcon, InformationIcon } from "icons"
import { Description, Title, Tooltip } from "ui-helpers"

export const Introduction = () => {
    return <section className="flex flex-col space-y-4">
        <EvmosRedIcon />
        {/* add i18 */}
        <Title>Transfer Assets</Title>
        <Description>Deposit and send assets to any account on any chain.</Description>
        
        <div>
            
            <div className="flex items-center space-x-1">
          <h3>Account information</h3>
          {/* update styles */}
          <div className="">
          <Tooltip
            
            element={<InformationIcon width={15} height={15} />}
            text={
              <>
               The addresses below are the same but in different formats. We provide this information for you to quickly refer to your address in instances like depositing assets into your account.
              </>
            }
          />
          </div>
        </div>
        </div>

    </section>
}