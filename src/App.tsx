import { useState } from 'react'
import './App.css'
import ruIcon from "/assets/icons/ru.svg"
import enIcon from "/assets/icons/en.svg"
import spIcon from "/assets/icons/sp.svg"
import geIcon from "/assets/icons/ge.svg"
import itIcon from "/assets/icons/it.svg"
import plIcon from "/assets/icons/pl.svg"
import NavBar from './components/Navbar'
import Search from './components/Search'

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
export interface Language {
    id: number;
    name: string;
    icon: string;
    text: string;
    status: string;
}
function App(props: { multiselect: boolean, icons: boolean }) {
    const multiselect = props.multiselect;
    const [inputValue, setInputValue] = useState('');
    const [languagesList, setLanguagesList] = useState(languages);
    const [dropDown, setDropDown] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState<Language[] | []>([]);
    const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let List = languagesList;
        if (!multiselect) {
            List = languages
        }
        const language = List.find((lang) => lang.name === e.target.name);
        if (language) {
            const updatedLanguage = {
                ...language,
                status: e.target.checked ? "true" : "false"
            };
            const updatedList = List.map((lang) =>
                lang.name === e.target.name ? updatedLanguage : lang
            );
            if (updatedLanguage.status === "true") {
                if (!multiselect) {
                    setSelectedLanguages([updatedLanguage]);
                } else {
                    setSelectedLanguages([...selectedLanguages, updatedLanguage]);
                }
            } else {
                setSelectedLanguages(
                    selectedLanguages.filter((lang) => lang.name !== e.target.name)
                );
            }
            setLanguagesList(updatedList);
        }
    }
    const handleDelete = (language: Language) => {
        setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
        const updatedLanguages = languagesList.map((lang) => {
            if (lang === language) {
                lang.status = "false";
            }
            return lang;
        });
        setLanguagesList(updatedLanguages);
    }
    console.log('rerender')
    return (
        <>
            <NavBar dropDown={dropDown} setDropDown={setDropDown} selectedLanguages={selectedLanguages} handleDelete={handleDelete} />
            {dropDown ? <div className="card">
                <Search inputValue={inputValue} setInputValue={setInputValue} />
                {languagesList.filter((language) => language.text.toLowerCase().includes(inputValue.toLowerCase())).map((language) => (
                    <div key={language.id} className='languageContainer'>
                        <p>{props.icons ? <img src={language.icon} alt="" /> : null} {language.text}</p>
                        <input className='languageCheckbox' type="checkbox" id={language.name} name={language.name} onChange={(e) => checkboxHandler(e)}
                            value={language.text} checked={language.status === "true"}></input>
                        <label htmlFor={language.name}></label>
                    </div>
                ))}
            </div> : null}
        </>
    )
}

export default App
