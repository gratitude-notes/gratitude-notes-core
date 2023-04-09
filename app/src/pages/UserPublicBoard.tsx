import { useParams, Link } from "react-router-dom";

const UserPublicBoard: React.FC = () => {
    let params = useParams();
    const userID = params.userID;

    return (
        <div>
            {userID}
            <Link to="/" className="bg-black">Back</Link>
            <h1>Public Board</h1>
        </div>
    )
}

export default UserPublicBoard;