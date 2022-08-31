import { Cycle } from './cycles.reducer'

export enum CyclesActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_AS_FINISHED = 'MARK_CURRENT_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: CyclesActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  }
}

export function interruptCurrentCycleAction() {
  return { type: CyclesActionTypes.INTERRUPT_CURRENT_CYCLE }
}

export function markCurrentCycleAsFinishedAction() {
  return { type: CyclesActionTypes.MARK_CURRENT_AS_FINISHED }
}
