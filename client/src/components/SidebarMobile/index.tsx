import { Sidebar } from '../Sidebar'
import styles from './SidebarMobile.module.scss'


type TSidebarMobile = {
    setIsMenuOpen:React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
}
export const SidebarMobile = ({setIsMenuOpen, isOpen}:TSidebarMobile) => {
    return (
        <div>
            <div className={styles.sMobile}>
                <button className={styles.sMobile__openMenu} onClick={() => setIsMenuOpen(prev => !prev)}>{isOpen ? "Закрыть" : "Открыть меню"}</button>
                <div className={styles.sMobile__sidebar} style={isOpen ? { left: "0" } : {}}>
                    <Sidebar setIsMenuOpen={setIsMenuOpen} />
                </div>
            </div>
        </div>
    )
}