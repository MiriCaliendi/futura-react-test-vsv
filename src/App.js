import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

const ALLCATEGORIESURL = 'https://api.chucknorris.io/jokes/categories'
//const RANDOMJOKEBYCATURL = 'https://api.chucknorris.io/jokes/random?category='
const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query='

const Logo = ({ loading }) => {
  return (
    <img
      src={logo}
      className={`App-logo${loading ? ' App-logo-spinning' : " "}`}
      alt='interactive-logo'
    />
  )
}

const CategoryButton = ({ title, onClick }) => {
  return null
  // <button className="Cat-button" ... >
  //   <code>{title}</code>
  // </button>
}

const CategoriesList = ({ categories, onCategoryClick }) => {
  return null
  // per ciascun elemento di 'categories' renderizzare il componente <CategoryButton />
}

const Joke = ({ value, categories }) => {
  return (
    <div className="Joke">
      <code className="Joke-Value">{categories}</code><br />
      <span className={`Dont-View-Cat${categories === "" ? "Selected-Cat" : ""}`} >
        <code >{value}</code>
      </span>
    </div>
  )
}

function App() {
  const [text, setText] = useState('')
  const [fetchedJoke, setFetchedJoke] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const launchErrorAlert = (errore) => {
    if (errore === true) {
      (text === "") || alert("Error, incorrect value")
    }
  }
  // getRandomJokeByCat
  // funzione che recupera una singola barzelletta e la salva
  
  // onCategoryClick
  // funzione richiamata al click del componente CategoryButton

  const getAllCategories = async () => {
    let joke = {}
    let errore = false
    let categoria = []

    try {
      setLoading(true)
      const response = await fetch(ALLCATEGORIESURL)
      let data = await response.json()
      if (data.error) throw new Error(data.error)
      joke = { ...data }

    } catch (err) {
      errore = true
      console.log("Error: ", err)

    } finally {
      setLoading(false)
      setError(errore)
      //per punto 7
      categoria = joke
    }
  }

  const getJokeByKeyword = async () => {
    let joke = {}
    let errore = false
    let url = ""

    try {
      setLoading(true)
      url = `${ALLLJOKESBYKEYWORD}${text}`
      const response = await fetch(url)
      let data = await response.json()
      if (data.error) throw new Error(data.error)
      joke = { ...data.result }
      console.log(joke[0].value)

    } catch (err) {
      errore = true
      console.log("Error: ", err)

    } finally {
      setLoading(false)
      setError(errore)
      if (errore === true) {
        launchErrorAlert(errore)
      } else {
        setFetchedJoke(joke[0].value)
      }
    }
  }

  const onInputTextChange = (event) => {
    setText(event.target.value)
    setFetchedJoke("")
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <div className="App">
      <div className="App-header">
        <Logo
          loading={loading}
        />
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Enter keyword here"
          value={text}
          onChange={onInputTextChange}
        />
        <button
          className="Search-Button"
          onClick={getJokeByKeyword}
          type="button"
        > <code>CLICK TO SEARCH!</code>
        </button>
        <code>or: </code>
        <CategoriesList
            // ...
          />
      </div>
      <div className="Content">
        <img
          src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png"
          className="Chuck-Logo"
          alt="chuck-logo"
        />
        <code>
          {!error && (
            <h2>
              SELECTED CATEGORY:
              <span className="Selected-Cat">
                {text}
              </span>
            </h2>
          )}
        </code> 
        <button
          className="Random-Button"
          // ...
        >
          <h2>GET RANDOM JOKE FOR SELECTED CATEGORY</h2>
        </button>
        {text !== "" && (
          <Joke
            value={fetchedJoke}
            categories={text}
          />
        )}
      </div>
      <div className="footer">
        <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: Miriana Caliendi</code>
      </div>
    </div>
  );
};

export default App;   
