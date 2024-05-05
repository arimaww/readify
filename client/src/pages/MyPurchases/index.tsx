import { useSelector } from "react-redux"
import { useGetAllPurchasesByUserIdQuery } from "../../app/services/purchase"
import { selectUser } from "../../features/auth/authSlice"
import styles from './MyPurchased.module.scss'
import { PurchasedBookList } from "../../components/PurchasedBookList"
import { useGetAllBooksQuery } from "../../app/services/book"
import { LoadingPage } from "../../components/LoadingPage"
import { useState } from "react"
import { SidebarMobile } from "../../components/SidebarMobile"

export const MyPurchases = () => {
    const user = useSelector(selectUser)
    const purchases = useGetAllPurchasesByUserIdQuery({ userId: Number(user?.userId) })
    const [isOpen, setIsMenuOpen] = useState<boolean>(false);

    const books = useGetAllBooksQuery();

    const purchasedBookList = books.data?.filter(el => purchases.data?.some(pc => el.bookId === pc.bookId));

    if (!purchasedBookList) return <LoadingPage />

    return <div className={styles.myPurchases}>
        <div className={styles.myPurchases__menu}>
            <SidebarMobile isOpen={isOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
        <div className={styles.myPurchases__list}>
            <PurchasedBookList books={purchasedBookList} />
        </div>
    </div>
}