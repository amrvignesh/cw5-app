import React, { Component } from 'react';
import List from './List';
import { DropdownButton, Dropdown } from 'react-bootstrap';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      type: "All"
    };
  }

  // Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  }

  // Sets the state whenever the user selects a dropdown option
  onFilter = (eventKey) => {
    this.setState({ type: eventKey });
  }

  // Returns a filtered array of produce based on the search and type state
  filterItem = (array, search, type) => {
    return array.filter(l => {
      // Check if item matches search term
      const matchesSearch = l.name.toLowerCase().includes(search);
      
      // Check if item matches type filter
      const matchesType = type === "All" || l.type === type;
      
      return matchesSearch && matchesType;
    });
  }

  render() {
    return (
      <div className="filter-list">
        <h1>Produce Search</h1>
        <DropdownButton
          id="typeDropdown"
          title={this.state.type}
          onSelect={this.onFilter}
          variant="success"
          className="mb-3"
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Fruit">Fruit</Dropdown.Item>
          <Dropdown.Item eventKey="Vegetable">Vegetable</Dropdown.Item>
        </DropdownButton>
        <input 
          type="text" 
          placeholder="Search for produce..." 
          onChange={this.onSearch}
          className="form-control mb-3"
        />
        <List items={this.filterItem(this.props.items, this.state.search, this.state.type)} />
      </div>
    );
  }
}

export default FilteredList;