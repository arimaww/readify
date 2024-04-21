import { ChangeEvent } from "react"

type TSearchBook = {
  search: string,
  setSearch: (e:string) => void
}

const SearchBook = ({search, setSearch}:TSearchBook) => {
  return (
    <input
    style={{outline: "none", borderRadius: "12px", border: "1px solid gray", textIndent: '7px', height: "28px", width: "210px", }}
    placeholder='Поиск' onChange={(e:ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} value={search} />
  )
}

export default SearchBook