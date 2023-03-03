// All these custom interfaces let our IDE know what properties are available on our objects.
import { BaseKey } from '@pankod/refine-core';

export interface AgentCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    avatar: string,
    numOfProperties: number
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}
