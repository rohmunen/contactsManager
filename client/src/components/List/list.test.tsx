import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { List } from '.'

type Data = {
  id: number,
  name: string
}


test('renders list with data', () => {
  const data = [ { id: 1, name: 'John' }, { id: 2, name: 'Peter' } ]
  const renderEmpty = <p>Nothing to see here</p>
  const renderItem = (item: Data) => {
    return (
      <div>
        { item.name }
      </div>
    )
  }
  render(<List
    data={ data }
    renderEmpty={ renderEmpty }
    renderItem={ renderItem }
  />)
  data.forEach(item => expect(screen.queryByText(item.name)).toBeInTheDocument())
  expect(screen.queryByText(/Nothing to see here/i)).toBeNull()
})

test('renders renderEmpty if data array is empty', () => {
  const data: Array<Data> = []
  const renderEmpty = <p>Nothing to see here</p>
  const renderItem = (item: typeof data[ 0 ]) => {
    return (
      <div>
        { item.name }
      </div>
    )
  }
  render(<List
    data={ data }
    renderEmpty={ renderEmpty }
    renderItem={ renderItem }
  />)
  data.forEach(item => expect(screen.queryByText(item.name)).toBeNull())
  expect(screen.queryByText(/Nothing to see here/i)).toBeInTheDocument()
})

