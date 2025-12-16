export enum Tab {
  DICE = 'DICE',
  SPINNER = 'SPINNER',
  MAGIC_BALL = 'MAGIC_BALL'
}

export enum DieType {
  D4 = 4,
  D6 = 6,
  D8 = 8,
  D10 = 10
}

export interface SpinnerItem {
  id: string;
  label: string;
  color: string;
}
