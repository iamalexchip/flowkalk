
export type ICalculation = {
  id: number,
  name: string,
  content: string,
  result?: number | null,
  pos: number,
}

export type CalcChangeEvent = (calculation: Partial<ICalculation>) => void

export type Variable = {
  name: string,
  value: number | null,
}
