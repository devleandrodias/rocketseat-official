import { Play } from 'phosphor-react'

import {
  Separator,
  FormContainer,
  HomeContainer,
  CountdownContainer,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
} from './stlyle'

export function Home() {
  return (
    <HomeContainer>
      <form action="POST">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="taskSuggestions"
            placeholder="De um nome para o seu projeto"
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
            id="minutesAmount"
            placeholder="00"
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24} />
          Iniciar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
