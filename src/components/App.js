import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { addRecipe, removeFromCalendar } from '../actions'
import { capitalize } from '../utils/helper'
import Modal from 'react-modal'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
import Loading from 'react-loading'
import { fetchRecipes } from '../utils/api'
import FoodList from './FoodList'
import ShoppingList from './ShoppingList'
import moment from 'moment'
import WeeklyMeals from './WeeklyMeals'
import MyKitchen from './MyKitchen'
import 'react-datepicker/dist/react-datepicker.css'

class App extends Component {
  state = {
    foodModalOpen: false,
    meal: null,
    day: null,
    food: null,
    ingredientsModalOpen: false,
    loadingFood: false,
    startDate: moment(),
  }

  trim = (str) => (
   str.length > 30
    ? str.slice(0, 30) + '...'
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
    const { foodModalOpen, loadingFood, food, ingredientsModalOpen } = this.state
    const { selectRecipe } = this.props
    return (
      <div className="App">

        {/* Routing */}
        <HashRouter>
          <Switch>
            <Route exact path="/" render={() =>
              <WeeklyMeals openAddFoodModal={this.openFoodModal} shoppingListModal={this.openIngredientsModal} />
            }/>
            <Route path="/kitchen" render={() =>
              <MyKitchen />
            }/>
          </Switch>
        </HashRouter>



        {/* Modals */}
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={foodModalOpen}
          onRequestClose={this.closeFoodModal}
          contentLabel='Modal'
        >
          <div className="search-results">
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
          contentLabel='Modal'>
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