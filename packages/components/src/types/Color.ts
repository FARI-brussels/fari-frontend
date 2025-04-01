export type Color =
  | 'red'
  | 'green'
  | 'blue'
  | 'white'
  | 'black'
  | 'primary'
  | 'secondary'
  | 'blue-light'


  export type StrokeColor = Exclude<Color, 'red' | 'green' | 'blue' | 'primary' | 'secondary'>
