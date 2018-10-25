import React, {Component} from 'react'
import SecondaryNav from './SecondaryNav';

class ShoppingList extends Component {
  render(){
    const {list} = this.props;
  return (
    <div className="shopping-list-wrap">
      <SecondaryNav title="Shopping List" routeBack="/"  />
      <div className='ingredients-list container'>
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
    </div>
      
    )
  }  
}

export default ShoppingList