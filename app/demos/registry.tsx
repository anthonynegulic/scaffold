import { ComponentType } from 'react'
import ZeroShotDemo from './ZeroShotDemo'
import FewShotDemo from './FewShotDemo'
import RolePromptingDemo from './RolePromptingDemo'
import ChainOfThoughtDemo from './ChainOfThoughtDemo'

const registry: Record<string, ComponentType> = {
  'zero-shot-prompting': ZeroShotDemo,
  'few-shot-prompting': FewShotDemo,
  'role-prompting': RolePromptingDemo,
  'chain-of-thought': ChainOfThoughtDemo,
}

export default registry