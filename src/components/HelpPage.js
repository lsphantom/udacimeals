import React, {Component} from 'react'
import SecondaryNav from './SecondaryNav'
import UserIcon from 'react-icons/lib/md/account-circle'
import DateSelect from 'react-icons/lib/fa/caret-square-o-down'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'
import Printer from 'react-icons/lib/fa/print'
import ListIcon from 'react-icons/lib/fa/list-alt'


class HelpPage extends Component {

render (){

	return (
		<div id="help-page">
			<SecondaryNav title="Bare Necessities - Weekly Meal Prep" routeBack="/" />

			<div className="container">
				<ul id="help-list">
					<li><h5>What's Bare Necessities?</h5>
						<p>Simply a progressive web app to help track weekly meals for prepping and cooking.</p>
						<p>The idea behind it is to make it easier to prepare a menu for the entire week, and to be able to save your recipes so you can spend less time creating shopping lists and figuring out what to eat on a daily basis.</p></li>
					<li>
						<h5>How to get started</h5>
						<p>Because this is not an open app, by default your recipes and weekly menu will be saved to your web browser's local storage. So you'll need to open this app in the same browser to see any saved recipes or menus.</p>
						<p>If you're a registered user, you can sign in through the user icon <UserIcon size={15}/> on the top right of the <strong>Weekly Meals</strong> page.</p>
						<ul>
							<li>
								<h6>Select a week</h6>
								<p>A calendar week can be picked from the datepicker by clicking the dropdown icon <DateSelect size={15}/> next to <em>Sunday</em>. You can only pick a Sunday to start your week, then the rest of the dates will be automatically populated.</p>
							</li>
							<li>
								<h6>Add a meal in a day</h6>
								<p>Click on the day/meal box <CalendarIcon size={15}/> that you want to add, then you can search Edamam for recipes or add from your personal recipes below.</p>
								<p>Edamam restricts throttling for too many requests within 5 minutes, so be concious of searching this database.</p>
								<p>If you have no personal recipes, go to the <strong>My Kitchen</strong> page to add recipes.</p>
							</li>
							<li>
								<h6>Add a personal recipe.</h6>
								<p>To add your own recipes, go to the <strong>My Kitchen</strong> page and click on <em>Add a recipe</em> to create a recipe.</p>
							</li>
						</ul>
					</li>
					<li>
						<h5>Printing the weekly menu</h5>
						<p>To print the menu, click on the print icon <Printer size={15}/> to get a cleaner version that's ready for printing.  Remember to use landscape print orientation for best results.</p>
						<p>To return to editing mode click on the edit icon.</p>
					</li>
					<li>
						<h5>See your shopping list</h5>
						<p>To see and edit your shopping list click on the shopping list icon <ListIcon size={15}/> on the top right.</p>
					</li>
				</ul>		
			</div>
		</div>
	)
}
}

export default HelpPage;