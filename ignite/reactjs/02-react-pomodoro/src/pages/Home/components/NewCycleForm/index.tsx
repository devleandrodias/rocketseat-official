import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { CyclesContext } from '../../../../contexts/CyclesContext'
import { FormContainer, MinutesAmountInput, TaskInput } from './style'

export function NewCycleForm() {
  const { register } = useFormContext()
  const { activeCycle } = useContext(CyclesContext)

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        list="taskSuggestions"
        disabled={!!activeCycle}
        placeholder="De um nome para o seu projeto"
        {...register('task')}
      />

      <datalist id="taskSuggestions">
        <option value="Projeto 1">Project React</option>
        <option value="Projeto 2">Projeto Node</option>
        <option value="Projeto 3">Projeto AWS</option>
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        step={5}
        min={5}
        max={60}
        type="number"
        placeholder="00"
        id="minutesAmount"
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
