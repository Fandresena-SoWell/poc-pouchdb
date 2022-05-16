export interface TodoItem {
  id: number
  label: string
  state: 'pending' | 'canceled' | 'done'
}

export interface TodoEvent {
  id: number
  state: 'pending' | 'canceled' | 'done'
}
