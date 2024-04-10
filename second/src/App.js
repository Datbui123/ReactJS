import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import $ from 'jquery';
import data from './data.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Code() {

  function Submit(e) {

    function validateEmail(email) {
      const regex = /^a|b$/;
      return regex.test(email);
    }

    var email = $('#email').val();
    if (!validateEmail(email)) {
      alert("Vui lòng nhập đúng định dạng email!");
    }
  }

  function getData() {
    document.getElementById('demo').innerHTML = data.employees[1].firstName;
  }

  return (
    <div>
      <form onSubmit={Submit}>
        <input type='text' id='email' />
        <button type='submit'>123</button>
      </form>
      <h1>{data.employees[1].firstName}</h1>
      <div id='demo'>123</div>
      <button onClick={getData}>Get Data</button>
    </div>
  )
}

function Demo() {

  function getData() {
    const request = new XMLHttpRequest();
    request.onload = function () {
      request.open("GET", "data.json", true);
      request.setRequestHeader("Content-type", "application/json");
      request.send();

      const myObj = JSON.parse(request.responseText);
      document.getElementById("demo").innerHTML = myObj.employees[1].firstName;


    }
  }

  return (
    <div>
      <div id='demo'>123</div>
      <button onClick={getData}>Get Data</button>
    </div>
  )
}

function TodoList() {
  const [tasks, setTasks] = useState(data.tasks);
  const [newTask, setNewTask] = useState('');
  const { nextId, employees } = data;
  const [showPrompt, setShowPrompt] = useState(false);
  const [search, setSearch] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setTasks([...tasks, { id: data.nextId++, text: newTask, status: 'In progress' }]);
    // const newTaskObj = { id: data.nextId++, text: newTask, status: 'In progress' };
    // setTasks([...tasks, newTaskObj]);
    setNewTask('');

    // Send a POST request to the server to save the new task to the JSON file
    // const request = new XMLHttpRequest();
    // request.open("POST", "data.json", true);
    // request.setRequestHeader("Content-type", "application/json");
    // request.send(JSON.stringify(newTaskObj));
  };

  const handleFinished = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = 'Completed';
    setTasks(updatedTasks);

    const table = document.getElementById('table');
    const tbody = table.getElementsByTagName('tbody')[0]
    const row = tbody.rows[index];
    row.cells[1].style.textDecoration = "line-through";
    // row.cells[2].textContent = "Completed";
    row.style.backgroundColor = "aqua";

  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    setShowPrompt(true);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const filteredTasks = tasks.filter((task) => {
    if (search === '') {
      return true;
    } else {
      return task.text.toLowerCase().includes(search.toLowerCase());
    }
  });

  const handlePromptSubmit = (index) => {
    const newText = prompt("Enter the new text for the task:");
    if (newText !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = newText;
      setTasks(updatedTasks);
    }
    setShowPrompt(false);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newTask} onChange={(event) => setNewTask(event.target.value)} />
        <button type="submit" class="button">Add</button>
      </form>
      <input class="search" type="text" placeholder='Search' value={search} onChange={handleSearch} />
      <table id='table'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Todo Item</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td><span>{task.text}</span></td>
              <td class="status">{task.status}</td>
              <td>
                <button className="button1" onClick={() => handleDelete(index)}>Delete</button>
                <button className="button2" onClick={() => handleFinished(index)}>Finished</button>
                {/* <button onClick={() => handleEdit(index)}>Edit</button> */}
                <button className="button1" onClick={() => handlePromptSubmit(index)}>OK</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default TodoList;
