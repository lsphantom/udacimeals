import React from 'react'

export default function ShoppingList ({ list }) {
  return (
    <div className='ingredients-list'>
      <h3 className='subheader'>Shopping List</h3>
      { list.length < 1
        ? <p>-No items for your shopping list-</p>
        : <ul className='shopping-list'>
            {list.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul>
      }
    </div>
  )
}