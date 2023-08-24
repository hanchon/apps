import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { Dispatch, SetStateAction } from "react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export function Toggle({ enabled, setEnabled }: { enabled: boolean, setEnabled: Dispatch<SetStateAction<boolean>> }) {
    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 ${enabled ? 'bg-green' : 'bg-darkPearl'}`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={classNames(
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
            />
        </Switch>
    )
}