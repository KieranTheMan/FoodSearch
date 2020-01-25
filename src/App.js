import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Foods from './components/Foods'

const API_KEY = '040fb28bea6246d79d1a029c1f6f212e'
//asyn await then fetch api data 
class App extends Component {
  state = {
    foods: []
  }
  getFood = async (e) => {
    const foodName = e.target.elements.foodName.value
    e.preventDefault(); // prefevents the fullpage from refreshing
    const api_call = await fetch(`https://api.spoonacular.com/food/products/search?query=${foodName}&apiKey=${API_KEY}`)
    const data = await api_call.json();
    this.setState({foods: data.products})
  }
  componentDidUpdate = () => {
    let foods = JSON.stringify(this.state.foods);
    localStorage.setItem('foods', foods);
  }
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Food Search</h1>
        </header>
          <Form getFood={this.getFood}/>
          <Foods foods={this.state.foods}/>
      </div>
    );
  }
}
export default App;
