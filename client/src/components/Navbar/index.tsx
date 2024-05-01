import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import AuthPopup from '../AuthPopup'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { ProfilePopup } from '../ProfilePopup'
import { ChangeEvent, useState } from 'react'
import { setSearchBooks } from '../../features/mainSearch/mainSearchSlice'


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
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [profileClick, setProfileClick] = useState<boolean>(false);

    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <Link to={'/'} className={styles.logo}>Readify</Link>
                {/* <div className={styles.categories}>
                    <button className={styles.categories__button}>
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 10H5.5C4.94772 10 4.5 10.4477 4.5 11V18C4.5 18.5523 4.94772 19 5.5 19H19.5C20.0523 19 20.5 18.5523 20.5 18V11C20.5 10.4477 20.0523 10 19.5 10Z" stroke="#E9EBF0" strokeWidth="1.5" strokeLinejoin="round"></path><path d="M6.5 7.5H18.5" stroke="#E9EBF0" strokeWidth="1.5" strokeLinejoin="round"></path><path d="M8.5 5H16.5" stroke="#E9EBF0" strokeWidth="1.5" strokeLinejoin="round"></path></svg>
                        <div>Каталог</div>
                    </button>
                </div> */}
                <div className={styles.search}>
                    <textarea placeholder='Искать книгу' onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSearch(e.target.value)} value={search}>
                    </textarea>
                    <button className={styles.search__remove} type="reset" onClick={handleRemoveSearchValue}><i className="bi bi-x-lg"></i></button>
                    <button onClick={onClick} type='button' className={styles.search__button}>
                        <i className="bi bi-search"></i>
                    </button>
                </div>

                <div className={styles.menu_btn} onClick={() => setIsOpen(prev => !prev)}>
                    <span className={`${styles.bar} ${isOpen ? styles.bar_active : ""}`}></span>
                </div>
                <div className={styles.navigate} style={isOpen ? {} : { left: "-1000px" }}>
                    <li className={styles.navigate__item}><Link to="/favorite" className={styles.navigate__link} onClick={() => setIsOpen(prev => !prev)}>
                        <i className="bi bi-heart"></i>
                        <div>Избранное</div></Link></li>
                    <li className={styles.navigate__item}><Link to="/basket" className={styles.navigate__link} onClick={() => setIsOpen(prev => !prev)}>
                        <i className="bi bi-cart3"></i>
                        <div>Корзина</div></Link></li>
                    {user ? isOpen ? <li className={styles.navigate__item}>
                        <button onClick={() => setProfileClick(prev => !prev)} className={styles.navigate__button}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="11" r="3.25" stroke="#020305" strokeWidth="1.5"></circle><path d="M6.5 19.318C7.84208 18.0095 9.50575 17 12 17C14.4943 17 16.1579 18.0095 17.5 19.318" stroke="#020305" strokeWidth="1.5"></path><rect x="3" y="3" width="18" height="18" rx="9" stroke="#020305" strokeWidth="1.5"></rect></svg>
                            <div><span>Профиль</span> {profileClick ? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>}
                            </div>
                        </button>
                        {profileClick ? <ProfilePopup setIsOpen={setIsOpen} /> : ""}

                    </li> : <li className={styles.navigate__item}><Popup trigger={
                        <button className={styles.navigate__button}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="11" r="3.25" stroke="#020305" strokeWidth="1.5"></circle><path d="M6.5 19.318C7.84208 18.0095 9.50575 17 12 17C14.4943 17 16.1579 18.0095 17.5 19.318" stroke="#020305" strokeWidth="1.5"></path><rect x="3" y="3" width="18" height="18" rx="9" stroke="#020305" strokeWidth="1.5"></rect></svg>
                            <div>Профиль
                            </div>
                        </button>
                    } position="bottom center">
                        <ProfilePopup setIsOpen={setIsOpen} />
                    </Popup></li> : ""

                    }

                    {user ? "" : <li className={styles.navigate__item}>
                        <Popup trigger={
                            <button onClick={() => setIsOpen(prev => !prev)} className={styles.navigate__button}>
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
