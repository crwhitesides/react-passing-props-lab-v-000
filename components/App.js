import React from 'react';
import { Component } from 'react'

import FruitBasket from './FruitBasket';

// const App = () => {
//   return (
//     <FruitBasket />
//   );
// }

// Stateful implementation of App component:
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fruit: [],
      filters: [],
      currentFilter: null
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

    componentWillMount() {
      this.fetchFilters()
      this.fetchFruit()
    }

    /*
    `fetchFruit()` and `fetchFilters()` are neither event handlers nor callbacks
    and, therefore, don't need to be bound in the constructor of the component.
    See: http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
    */

    fetchFilters() {
      fetch('/api/fruit_types')
        .then(res => res.json())
        .then(filters => this.setState({ filters }))
    }

    fetchFruit() {
      fetch('/api/fruit')
        .then(res => res.json())
        .then(fruit => this.setState({ fruit }))
    }

    handleFilterChange(e) {
      console.log('new filter: ', e.target.value);
      this.setState({ currentFilter: e.target.value });
    }

    render() {
      return(
        <FruitBasket
          fruit={this.state.fruit}
          filters={this.state.filters}
          currentFilter={this.state.currentFilter}
          updateFilterCallback={this.handleFilterChange}
        />
      )
    }
}



export default App;
