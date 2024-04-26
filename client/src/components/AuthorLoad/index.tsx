import { Link } from 'react-router-dom';
import { LoadingPage } from '../LoadingPage';
import { User } from '@prisma/client';

type TAuthorLoad = {
    author: User | undefined
}

export const AuthorLoad = ({ author }: TAuthorLoad) => {

    if(!author)
        return <LoadingPage />

    return (
        <div style={{display: "flex", alignItems: "center", gap: "15px", userSelect: "none"}}>
            <img src={author?.profilePhoto!} style={{width: "40px", height: "40px", borderRadius: "50%"}} alt="" />
            <Link to="/" style={{fontSize: "15px", fontWeight: "500", textDecoration: "none", color: 'blue'}}>{author?.firstName} {author?.surName}</Link>
        </div>
    )
}
