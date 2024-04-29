import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import AuthPopup from '../AuthPopup'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { ProfilePopup } from '../ProfilePopup'
import { ChangeEvent } from 'react'
import { selectSearchValue, setSearchBooks } from '../../features/mainSearch/mainSearchSlice'


type TNavbar = {
    search: string | undefined,
    setSearch: (e: string) => void,
    onClick: () => void
}

const Navbar = ({ search, setSearch, onClick }: TNavbar) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleRemoveSearchValue = () => {
        dispatch(setSearchBooks(null))
        setSearch("");
    }
    const searchedValue = useSelector(selectSearchValue)
    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <Link to={'/'} className={styles.logo}>BookService</Link>
                {/* <div className={styles.categories}>
                    <button className={styles.categories__button}>
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 10H5.5C4.94772 10 4.5 10.4477 4.5 11V18C4.5 18.5523 4.94772 19 5.5 19H19.5C20.0523 19 20.5 18.5523 20.5 18V11C20.5 10.4477 20.0523 10 19.5 10Z" stroke="#E9EBF0" strokeWidth="1.5" strokeLinejoin="round"></path><path d="M6.5 7.5H18.5" stroke="#E9EBF0" strokeWidth="1.5" strokeLinejoin="round"></path><path d="M8.5 5H16.5" stroke="#E9EBF0" strokeWidth="1.5" strokeLinejoin="round"></path></svg>
                        <div>Каталог</div>
                    </button>
                </div> */}
                <div className={styles.search}>
                    <input type="text" placeholder='Искать книгу' onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} value={search} />
                    {searchedValue || search ? <button onClick={handleRemoveSearchValue} style={{ background: "transparent", color: "red" }}><i className="bi bi-x-lg"></i></button> : ""}
                    <button onClick={onClick} type='button'>
                        Найти</button>
                </div>
                <div className={styles.navigate}>
                    <li className={styles.navigate__item}><Link to="/favorite" className={styles.navigate__link}>
                        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.1748 2.2002C18.7214 3.74684 18.7807 6.23557 17.3093 7.85403L9.93699 15.9629L2.56562 7.854C1.09429 6.23554 1.15355 3.74679 2.70019 2.20015C4.42711 0.473229 7.27122 0.631031 8.79687 2.53809L9.9375 3.96335L11.0771 2.53793C12.6028 0.630869 15.4479 0.473284 17.1748 2.2002Z" stroke="#020305" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <div>Избранное</div></Link></li>
                    <li className={styles.navigate__item}><Link to="/basket" className={styles.navigate__link}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.9243 9H5.07573C4.41135 9 3.93169 9.63591 4.11421 10.2747L5.92111 16.5989C6.41174 18.3161 7.98128 19.5 9.76721 19.5H14.2328C16.0187 19.5 17.5883 18.3161 18.0789 16.5989L19.8858 10.2747C20.0683 9.6359 19.5886 9 18.9243 9Z" stroke="#020305" strokeWidth="1.5" strokeLinejoin="round"></path><path d="M15.7395 9H8.26051C7.54417 9 7.06016 8.2689 7.33993 7.60945L7.62487 6.9378C8.25188 5.45986 9.70176 4.5 11.3072 4.5H12.6928C14.2982 4.5 15.7481 5.45986 16.3751 6.9378L16.6601 7.60945C16.9398 8.2689 16.4558 9 15.7395 9Z" stroke="#020305" strokeWidth="1.5" strokeLinejoin="round"></path></svg>
                        <div>Корзина</div></Link></li>

                    {user ? <li className={styles.navigate__item}><Popup trigger={
                        <button>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="11" r="3.25" stroke="#020305" strokeWidth="1.5"></circle><path d="M6.5 19.318C7.84208 18.0095 9.50575 17 12 17C14.4943 17 16.1579 18.0095 17.5 19.318" stroke="#020305" strokeWidth="1.5"></path><rect x="3" y="3" width="18" height="18" rx="9" stroke="#020305" strokeWidth="1.5"></rect></svg>
                            <div>Профиль
                            </div>
                        </button>
                    } position="bottom center">
                        <ProfilePopup />
                    </Popup></li> : ""}

                    {user ? "" : <li className={styles.navigate__item}>
                        <Popup trigger={
                            <button>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="11" r="3.25" stroke="#020305" strokeWidth="1.5"></circle><path d="M6.5 19.318C7.84208 18.0095 9.50575 17 12 17C14.4943 17 16.1579 18.0095 17.5 19.318" stroke="#020305" strokeWidth="1.5"></path><rect x="3" y="3" width="18" height="18" rx="9" stroke="#020305" strokeWidth="1.5"></rect></svg>
                                <div>Войти
                                </div>
                            </button>
                        } position="bottom center">
                            <AuthPopup />
                        </Popup>
                    </li>}


                </div>
            </div>
        </div>
    )
}

export default Navbar
