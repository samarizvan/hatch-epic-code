import React from 'react';
import "../css/App.css";

const Form = ({
  name,
  column,
  handleName,
  handleColumn,
  handleSerachChange,
  searchTerm,
  searchResults,
  handleSubmitForm
}) => (
<div className='grid-item form-main'>
  <form onSubmit={handleSubmitForm}>
          <div className='form-group'>
          <input
          type='text'
          name='name'
          className='form-control interinput'
          placeholder='ENTER ITEM'
          value={name}
          onChange={handleName}
        />
        </div>
        <div className='form-group'>
          <select className="form-control dropdown" value={column} onChange={handleColumn}>
            <option value="Choose Column">CHOOSE COLUMN</option>
            <option value="Column 1">Column 1</option>
            <option value="Column 2">Column 2</option>
        </select>
        </div>
        <button className='form-control add-btn'>ADD ITEM</button>
        <div className="search-main">
          <p>SEARCH AN ITEM</p>
        <input
          type="text"
          className='form-control searchinput'
          placeholder="Search"
          value={searchTerm}
          onChange={handleSerachChange}
        />
        <ul>
          {searchResults.map(item => (
                <li>{item.itemName}-{item.select}</li>
          ))}
        </ul>
      </div>
        </form>
 </div>
)

export default Form