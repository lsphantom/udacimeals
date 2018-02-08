import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'
import { capitalize } from '../utils/helper'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'
import Printer from 'react-icons/lib/fa/print'
import EditIcon from 'react-icons/lib/fa/edit'
import ListIcon from 'react-icons/lib/fa/list-alt'
import DateSelect from 'react-icons/lib/fa/caret-square-o-down'
import Modal from 'react-modal'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
import Loading from 'react-loading'
import { fetchRecipes } from '../utils/api'
import FoodList from './FoodList'
import ShoppingList from './ShoppingList'

class App extends Component {
  state = {
    foodModalOpen: false,
    meal: null,
    day: null,
    food: null,
    ingredientsModalOpen: false,
    loadingFood: false,
    printVersion: false,
  }

  trim = (str) => (
   str.length > 26
    ? str.slice(0, 26) + '...'
    : str
  )

  openFoodModal = ({ meal, day }) => {
    this.setState(() => ({
      foodModalOpen: true,
      meal,
      day,
    }))
  }
  closeFoodModal = () => {
    this.setState(() => ({
      foodModalOpen: false,
      meal: null,
      day: null,
      food: null,
    }))
  }
  searchFood = (e) => {
    if (!this.input.value) {
      return
    }

    e.preventDefault()

    this.setState(() => ({ loadingFood: true }))

    fetchRecipes(this.input.value)
      .then((food) => this.setState(() => ({
        food,
        loadingFood: false,
      })))
  }
  printToggle = (e) => {
    e.preventDefault()
    this.setState(() => ({ printVersion: !this.state.printVersion }))
  }
  openIngredientsModal = (e) => {
    e.preventDefault()
    this.setState(() => ({ ingredientsModalOpen: true }))
  }
  closeIngredientsModal = () => this.setState(() => ({ ingredientsModalOpen: false }))
  generateShoppingList = () => {
    return this.props.calendar.reduce((result, { meals }) => {
      const { breakfast, lunch, dinner } = meals

      breakfast && result.push(breakfast)
      lunch && result.push(lunch)
      dinner && result.push(dinner)

      return result
    }, [])
    .reduce((ings, { ingredientLines }) => ings.concat(ingredientLines), [])
  }
  render() {
    const { foodModalOpen, loadingFood, food, ingredientsModalOpen, printVersion } = this.state
    const { calendar, selectRecipe, remove } = this.props
    const mealOrder = ['breakfast', 'lunch', 'dinner']
    let printClass =  printVersion ? 'printable' : ''

    return (
      <div id="weekly-meals" className={`container ${printClass}`}>

        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
          <div className="container-fluid">
            <div className="left-nav-links">
              <a href="">Pantry &amp; Recipes</a>
            </div>
            <div className="app-brandname">
              <a href="/">Weekly Meals</a>
            </div>
            <div className="right-nav-links">
              <a href="" onClick={this.openIngredientsModal} title="Shopping List"><ListIcon size={18}/></a>
              <a href="" onClick={this.printToggle} title="Print / Edit">
                { this.state.printVersion
                  ? <EditIcon size={18}/>
                  : <Printer size={18}/>
                }
              </a>
            </div>
          </div>
        </nav>

        {/* Calendar and Meal Grid */}
        <div className='calendar container'>

          <div className="meal-type-sidebar">
            <ul className="meal-types">
              { mealOrder.map((meal, index) =>
                <li key={index}>{meal.substring(0,1)}</li> )
              }
            </ul>
          </div>


          <div className="week container-fluid">
          <div className="date-selector">
            <a href="" title="Set starting date"><DateSelect size={16} /></a>
          </div>
           <ul className="day-list">
           {
            calendar.map((day, index) => 
              <li key={index}>
                <h3>{day.day.substring(0,3)}</h3>
                <p>{/*?/?*/}</p>
              </li>
            )

           }
           </ul>

          { calendar.map(({day, meals}, index) => 
            <ul key={index} className="day-meals">
           {
            mealOrder.map( (meal, index) =>
                <li key={index} className={meal}>
                {meals[meal]
                  ? <div className="foodcard">
                    <div className="remove-meal">
                      <a href="" onClick={(e) => {e.preventDefault(); remove({meal, day})}}>x</a>
                    </div>
                    <a href="">
                    <img className="img-fluid"
                      src={meals[meal].image}
                      alt={meals[meal].label}
                       />
                    <h4>{this.trim(meals[meal].label)}</h4>
                    </a>
                    </div>
                  : <button onClick={() => this.openFoodModal({meal, day})} className='icon-btn'>
                          <CalendarIcon size={30}/>
                    </button>
                }
                </li>
            )
           }
           </ul>
           )
          }

          </div>
          
        </div>


        {/* Modals */}
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={foodModalOpen}
          onRequestClose={this.closeFoodModal}
          contentLabel='Modal'
        >
          <div>
            {loadingFood === true
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <div className='search-container'>
                  <h3 className='subheader'>
                    Add a meal for {capitalize(this.state.day)} {this.state.meal}.
                  </h3>
                  <div className='search'>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Search Edamam Recipes...'
                      ref={(input) => this.input = input}
                    />
                    <button
                      className='search-btn'
                      onClick={this.searchFood}>
                        <ArrowRightIcon size={30}/>
                    </button>
                  </div>
                  {food !== null && (
                    <FoodList
                      food={food}
                      onSelect={(recipe) => {
                        selectRecipe({ recipe, day: this.state.day, meal: this.state.meal })
                        this.closeFoodModal()
                      }}
                    />)}
                </div>}
          </div>
        </Modal>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={ingredientsModalOpen}
          onRequestClose={this.closeIngredientsModal}
          contentLabel='Modal'
        >
          {ingredientsModalOpen && <ShoppingList list={this.generateShoppingList()}/>}
        </Modal>

      </div>
    )
  }
}

function mapStateToProps ({ food, calendar }) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? food[calendar[day][meal]]
          : null

        return meals
      }, {})
    })),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectRecipe: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)