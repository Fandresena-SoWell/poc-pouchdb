export class TodoItem {
  public readonly label: string
  public readonly state: 'pending' | 'canceled' | 'done'

  constructor(
    label: string,
    state: 'pending' | 'canceled' | 'done' = 'pending'
  ) {
    this.label = label
    this.state = state
  }
}
