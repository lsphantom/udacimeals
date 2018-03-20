import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
import RecipeDetails from './RecipeDetails'
import NewRecipe from './NewRecipe'
import 'react-datepicker/dist/react-datepicker.css'

const uuidv1 = require('uuid/v1');

class App extends Component {
  state = {
    foodModalOpen: false,
    meal: null,
    day: null,
    food: null,
    ingredientsModalOpen: false,
    loadingFood: false,
    startDate: moment(),
    newRecipeObj: {},
  }

  trim = (str) => (
   str.length > 30
    ? str.slice(0, 30) + '...'
    : str
  )

  createNewRecipe = (recipe) => {
    let recipeId = uuidv1();
    let modRecipe = recipe;
        modRecipe.id = recipeId;
    const newRecipe = this.state.newRecipeObj;
    const currentDay = this.state.day;
    const currentMeal = this.state.meal;
    this.setState({
      newRecipeObj: {[recipeId]: modRecipe}
    });
    this.addRecipeToState(currentDay, currentMeal, newRecipe);
  }
  addIdToRecipe = (edamamRecipe) => {
    let recipeId = uuidv1();
    let modRecipe = edamamRecipe.recipe;
        modRecipe.id = recipeId;
    const {day, meal} = edamamRecipe;

    this.addRecipeToState(day,meal, modRecipe);
    this.closeFoodModal();
  }

  addRecipeToState = (day, meal, recipe) => {
    this.props.selectRecipe({ day, meal, recipe});
  }

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
    const { myRecipes } = this.props.recipes
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
            <Route exact path="/recipes/new/" component={NewRecipe} />
            <Route path="/recipes/:recipe_id" component={RecipeDetails} />
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
                        this.addIdToRecipe({day: this.state.day, meal: this.state.meal, recipe})
                      }}
                    />)}

                  <div className="search-modal-myrecipes">
                    <hr />
                    <h5>Add from your recipes:</h5>
                  

                  {myRecipes && myRecipes.length > 0
                    ? <FoodList
                      food={myRecipes}
                      onSelect={(recipe) => {
                        this.props.selectRecipe({day: this.state.day, meal: this.state.meal, recipe})
                        this.closeFoodModal()
                      }}
                    />
                    : <p className="i-note">- You have not created any recipes yet -</p>
                  }

                  </div>

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

function mapStateToProps ({ food, calendar, recipes }) {
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
    recipes,
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