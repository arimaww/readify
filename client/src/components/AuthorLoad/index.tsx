import { useGetAuthorByIdQuery } from '../../app/services/book'
import { Link } from 'react-router-dom';

type TAuthorLoad = {
    authorId: number
}

export const AuthorLoad = ({ authorId }: TAuthorLoad) => {
    const { data } = useGetAuthorByIdQuery({ authorId: authorId });

    return (
        <div style={{display: "flex", alignItems: "center", gap: "15px", userSelect: "none"}}>
            <img src={data?.profilePhoto!} style={{width: "40px", height: "40px", borderRadius: "50%"}} alt="" />
            <Link to="/" style={{fontSize: "15px", fontWeight: "500", textDecoration: "none", color: 'blue'}}>{data?.firstName} {data?.surName}</Link>
        </div>
    )
}
