import { memo } from "react";
import style from "./Search.module.css"
import searchIcon from "/assets/icons/search.svg"
const Search = memo((props: { setInputValue: (arg0: string) => void; inputValue: string | number | readonly string[] | undefined; }) => {
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setInputValue(event.target.value);
    }
    console.log("Search")
    return (
        <div className={style.searchContainer}>
            <div className={style.searchIconContainer}>
                <img className={style.searchIcon} src={searchIcon}></img>
            </div>
            <input className={style.search} type="text" id='search' onChange={inputHandler} value={props.inputValue} placeholder="Поиск"></input>
        </div>
    )
})
export default Search