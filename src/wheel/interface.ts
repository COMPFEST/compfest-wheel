type rewardProps = {
  id: string
  name: string
  amount: number
}

export interface wheelProps {
  rewards: rewardProps[]
  colors?: string[]
  wheelWidth: number
  duration?: number
  handleSpin: () => Promise<string | undefined>
}
