import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response=>{
      setRepositories(response.data);
    });
  },[repositories]);

  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      id: "123",
      title: "Front-End ReactJS",
	    url: "www.github.com/Jhonmt-cpu/coceitos-nodejs",
      techs: ["nodejs"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

    console.log(repositories);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`/repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    setRepositories(repositories.splice(repositoryIndex, 1));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
        return (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )})}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
