import React from 'react'

function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}

export default function FoodList ({ food, onSelect }) {
  if (food.length === 0) {
    return <p>No results.</p>
  }

  return (
    <ul className='food-list'>
      {food.map((item, index) => (
        <li onClick={() => onSelect(item)} key={index}>
          <h3>{trim(item.label)}</h3>
          <img src={item.image} alt={item.label ? item.label : item.name} />
          {item.calories
            ? <div className="cals">{Math.floor(item.calories)} <span>Kcal</span></div>
            : null
          }
          {item.source
            ? <div className="item-src">{item.source}</div>
            : <div className="item-src">My Recipes</div>
          }
          
        </li>
      ))}
    </ul>
  )
}