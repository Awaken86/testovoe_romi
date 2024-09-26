import { useEffect, useState } from 'react'
import './App.css'
import ruIcon from "./assets/icons/ru.png"
import enIcon from "./assets/icons/en.png"
import spIcon from "./assets/icons/sp.png"
import geIcon from "./assets/icons/ge.png"
import itIcon from "./assets/icons/it.png"
import plIcon from "./assets/icons/pl.png"
import searchIcon from "./assets/icons/search.png"
const languages = ([
    {
        id: 1,
        name: "Ru",
        icon: ruIcon,
        text: "Русский",
        status: "false"
    },
    {
        id: 2,
        name: "En",
        icon: enIcon,
        text: "Английский",
        status: "false"
    }
    ,
    {
        id: 3,
        name: "Sp",
        icon: spIcon,
        text: "Испанский",
        status: "false"
    }
    ,
    {
        id: 4,
        name: "Ge",
        icon: geIcon,
        text: "Немецкий",
        status: "false"
    }
    ,
    {
        id: 5,
        name: "It",
        icon: itIcon,
        text: "Итальянский",
        status: "false"
    }
    ,
    {
        id: 6,
        name: "Pl",
        icon: plIcon,
        text: "Польский",
        status: "false"
    }
])
function App() {
    const [inputValue, setInputValue] = useState('');
    const [currentLanguages, setCurrentLanguages] = useState(languages);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }
    const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const languageName = event.target.name;
        const language = currentLanguages.find((lang) => lang.name === languageName);
        if (language) {
            language.status = event.target.checked ? "true" : "false";
            if (language.status === "true") {
                setSelectedLanguages([...selectedLanguages, language]);
            } else {
                setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
            }
            setCurrentLanguages([...currentLanguages]);
        }
        console.log(selectedLanguages, currentLanguages);
    }
    const handleDelete = (language) => {
        setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
        const updatedLanguages = currentLanguages.map((lang) => {
            if (lang === language) {
                lang.status = false;
            }
            return lang;
        });
        setCurrentLanguages(updatedLanguages);
    }
    return (
        <>
            <div className="navbar">
                <p>Язык</p>
                <div className='currentLanguagesContainer'>
                    {selectedLanguages.map((language) => (
                        <div className='languageBox'>
                            <div>{language.text}</div>
                            <button onClick={() => handleDelete(language)} className='clearButton'>x</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="card">
                <div className='searchContainer'>
                    <img className='searchIcon' src={searchIcon}></img>
                    <input className='search' type="text" id='search' onChange={inputHandler} value={inputValue} placeholder="Поиск"></input>
                </div>
                {currentLanguages.filter((language) => language.text.toLowerCase().includes(inputValue.toLowerCase())).map((language) => (
                    <div className='languageContainer'>
                        <p key={language.id}><img src={language.icon}></img>{language.text}</p>
                        <input className='languageCheckbox' type="checkbox" id={language.name} name={language.name} onChange={checkboxHandler} value={language.text} checked={language.status === "true"}></input>
                        <label htmlFor={language.name}></label>
                    </div>
                ))}

            </div>

        </>
    )
}

export default App
