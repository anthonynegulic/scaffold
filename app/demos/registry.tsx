import { ComponentType } from 'react'
import ZeroShotDemo from './ZeroShotDemo'

const registry: Record<string, ComponentType> = {
  'zero-shot-prompting': ZeroShotDemo,
}

export default registry