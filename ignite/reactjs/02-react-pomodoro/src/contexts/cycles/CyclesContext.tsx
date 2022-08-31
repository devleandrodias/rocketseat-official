import { differenceInSeconds } from 'date-fns'
import React, { createContext, useState, useReducer, useEffect } from 'react'

import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from './cycles.actions'

import { Cycle, cyclesReducer } from './cycles.reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

export interface CyclesContextType {
  cycles: Cycle[]
  amountSecondsPassed: number
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  interruptCurrentCycle: () => void
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: React.ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const localStorageKey = '@rocketseat/timer:cyclesState/v1.0.0'
      const storagedState = localStorage.getItem(localStorageKey)

      if (storagedState) {
        return JSON.parse(storagedState)
      }
    }
  )

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
    document.title = 'Ignite Timer'
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState)
    localStorage.setItem('@rocketseat/timer:cyclesState/v1.0.0', stateJson)
  }, [cyclesState])

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        createNewCycle,
        setSecondsPassed,
        amountSecondsPassed,
        interruptCurrentCycle,
        markCurrentCycleAsFinished,
        cycles: cyclesState.cycles,
        activeCycleId: cyclesState.activeCycleId,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
