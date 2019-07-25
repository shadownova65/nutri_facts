import React from 'react';
import MealOptions from './MealOptions';
import axios from 'axios';


class AddMealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: '',
      dishes: '',
      type: '',
      options: {
        foods: [],
        dishes: []
      }

    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleShowMeal = this.handleShowMeal.bind(this);
  }

  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleShowMeal(e) {
    e.preventDefault();
    let {foods, dishes} = this.state;
    let foodsArr;
    let dishesArr;
    foods ? foodsArr = foods.split(/,\s*/) : foodsArr=[];
    dishes ? dishesArr = dishes.split(/,\s*/) : dishesArr=[];

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.post('/api', {foodsArr, dishesArr}).then(res => {
      console.log(res.data);
      let option = res.data;
      // option.type = this.state.type;
      // console.log('meal type is', option.type);
      this.setState({
        options: {
          foods: option,
          dishes: []
        },
        foods: '',
        dishes: ''
      })
      console.log('the food is', this.state.options.foods);
    })
  }

  render() {
    return (
      <div className='info-sub' id='add-meal-container'>
        <div className='add-meal-form'>
          <form onSubmit={this.handleShowMeal}>
            <div>
              Type: 
              <select name='type' onChange={this.handleFormChange}>
                <option value=''>--</option>
                <option value='breakfast'>Breakfast</option>
                <option value='lunch'>Lunch</option>
                <option value='snack'>Snack</option>
                <option value='supper'>Supper</option>
                <option value='dessert'>Dessert</option>
              </select>
            </div>

            <div>
              Add Foods:
              <input type='text' name='foods' value={this.state.foods} onChange={this.handleFormChange} placeholder='names for food'/>
              {' '}
              <input type='submit' value='SHOW' />
            </div>

            <div>
              Add a Dish:
              <input type='text' name='dish' value={this.state.dishes} onChange={this.handleFormChange} placeholder='name for dish' />
              {' '}
              <input type='submit' value='SHOW' />
            </div>
          </form>
        </div>

        <div className='meals-options-list-div'>
          <MealOptions options={this.state.options.foods.concat(this.state.options.dishes)} 
                        handleMealOptionSelect={this.props.handleMealOptionSelect}
                        type={this.state.type}
                        />
        </div>
      </div>
    );
  }
} 


export default AddMealForm;