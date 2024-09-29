import { Language } from '../App'
import style from './Navbar.module.css'
const NavBar = (props: { selectedLanguages: Language[]; handleDelete: (arg0: Language) => void; setDropDown: (arg0: boolean) => void; dropDown: boolean }) => {
    return (
        <div className={style.navbar}>
            <p>Язык</p>
            <div className={style.currentLanguagesContainer}>
                {props.selectedLanguages.map((language: Language) => (
                    <div key={language.id} className={style.languageBox}>
                        <div>{language.text}</div>
                        <img onClick={() => props.handleDelete(language)} src="/assets/icons/close.svg" />
                    </div>
                ))}
                <div onClick={() => props.setDropDown(!props.dropDown)} className={style.dropDownContainer}>
                    <img className={`dropDown${props.dropDown ? "active" : ""}`} src="/assets/icons/dropDownIcon.svg"></img>
                </div>
            </div>
        </div>
    )
}
export default NavBar