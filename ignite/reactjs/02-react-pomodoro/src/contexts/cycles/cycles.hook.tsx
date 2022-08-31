import { useContext } from 'react'
import { CyclesContext } from './CyclesContext'

export function useCyclesContext() {
  return useContext(CyclesContext)
}
