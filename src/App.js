import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import "./css/App.css";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const id = uuidv4();
  const [name, setName] = useState('');
  const [column, setColumn] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [columnOnes, setColumnOnes] = useState([]);
  const [columnTwos, setColumnTwos] = useState([]);
  const [displayOne, setDisplayOne] = useState([]);
  const [displayTwo, setDisplayTwo] = useState([]);
 
  
  useEffect(() => {
    setColumnOnes(JSON.parse(localStorage.getItem('localStorageColumnOnes')) || []);
    setDisplayOne(JSON.parse(localStorage.getItem('localStorageColumnOnes')) || []);
  }, []);

  const setLocalStorageOne = (dataSaveInLSOne) => {
    setColumnOnes(dataSaveInLSOne);
    setDisplayOne(dataSaveInLSOne);
    localStorage.setItem('localStorageColumnOnes', JSON.stringify(dataSaveInLSOne));
  };

  useEffect(() => {
    setColumnTwos(JSON.parse(localStorage.getItem('localStorageColumnTwos')) || []);
    setDisplayTwo(JSON.parse(localStorage.getItem('localStorageColumnTwos')) || []);
  }, []);

  const setLocalStorageTwo = (dataSaveInLSTwo) => {
    setColumnTwos(dataSaveInLSTwo);
    setDisplayTwo(dataSaveInLSTwo);
    localStorage.setItem('localStorageColumnTwos', JSON.stringify(dataSaveInLSTwo));
  };

  useEffect(() => {
    const resultsOne = displayOne.filter(displayOne =>
      displayOne.itemName.toLowerCase().includes(searchTerm)
    );
    const resultsTwo = displayTwo.filter(displayTwo =>
      displayTwo.itemName.toLowerCase().includes(searchTerm)
    );
    const results = [...resultsTwo, ...resultsOne];
    setSearchResults(results);
  }, [searchTerm]);

  const handleSerachChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleName = event => {
    setName(event.target.value)
  }

  const handleColumn = event => {
    setColumn(event.target.value)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if(column === 'Column 1'){
        const newTodo = { id, itemName: name, select:column};
        const dataSaveInLSOne = [...columnOnes, newTodo];
        setName('');
        setColumn('');
        setLocalStorageOne(dataSaveInLSOne);
    }
    if(column === 'Column 2'){
        const newTodo = { id, itemName: name, select:column};
        const dataSaveInLSTwo = [...columnTwos, newTodo];
        setName('');
        setColumn('');
        setLocalStorageTwo(dataSaveInLSTwo);
    }
  };

  const columnOneAll = () => setDisplayOne(columnOnes);
  const columnTwoAll = () => setDisplayTwo(columnTwos);

  const removeColoumnOne = (id) => {
    const dataSaveInLSOne = columnOnes.filter((columnOne) => columnOne.id !== id);
    setLocalStorageOne(dataSaveInLSOne);
  };

  const removeColoumnTwo = (id) => {
    const dataSaveInLSTwo = columnTwos.filter((columnTwo) => columnTwo.id !== id);
    setLocalStorageTwo(dataSaveInLSTwo);
  };

  return (
    <React.Fragment>
      <div className='main-content'>
        <div className='mainWrap'>
          <div className='top-bar'>
            <h1>Marvelous!</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</p>
          </div>
          <div className='title'>
            <h5>ADD AN ITEM</h5>
          </div>
          <div className='grid-container'>
            <Form
              id={id}
              name={name}
              column={column}
              handleName={handleName}
              handleColumn={handleColumn}
              handleSubmitForm={handleSubmitForm}
              handleSerachChange={handleSerachChange}
              searchTerm={searchTerm}
              searchResults={searchResults}
            />
            <div className='grid-item table-wrap-main'>
              <div className="table-wrap">
              <table>
                <thead className="thead-main">
                  <tr>
                    <th className="th-title">COLUMN 1</th>
                  </tr>
                </thead>
                <tbody className = 'main-table-body'>
                  {displayOne.map((columnOne) => (
                    <tr key={columnOne.id}>
                      <td className="item-text">{columnOne.itemName}</td>
                      <td className="btn-main"><button type='submit' onClick={()=>removeColoumnOne(columnOne.id)}>x</button></td>
                    </tr>
                  ))}
                  </tbody>
              </table>
            </div>
            <div className="table-wrap">
              <table>
                <thead className="thead-main">
                  <tr>
                    <th className="th-title">COLUMN 2</th>
                  </tr>
                </thead>
                <tbody className = 'main-table-body'>
                  {displayTwo.map((columnTwo) => (
                    <tr key={columnTwo.id}>
                      <td className="item-text">{columnTwo.itemName}</td>
                      <td className="btn-main"><button type='submit' onClick={()=>removeColoumnTwo(columnTwo.id)}>x</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>
      </div>
      </React.Fragment>
  )
}

export default App