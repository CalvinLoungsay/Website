import { ListGroup } from 'react-bootstrap'
import type { Comment } from '../../Components/Interfaces'
import { RenderStars } from "../../Components/ReviewUtilities"
import { FormatTimeAgo } from '../../Components/ReviewUtilities'
import "../../CSS/TodoList.css"
interface CommentProps {
    comment: Comment
    index: number
}

/* Comment Component */
export const CommentComp = (props: CommentProps) => {

    const createdAt = new Date(props.comment.createdAt);
    const updatedAt = new Date(props.comment.updatedAt);

    return (<>
        <ListGroup.Item key={props.index}>
            <strong>{props.comment.username}</strong> ({`${createdAt.getDate()} ${createdAt.toLocaleString("en-CA", { month: "long" })} ${createdAt.getFullYear()}`})
            {RenderStars(props.comment.rating, 25)}
            {createdAt.getTime() !== updatedAt.getTime() ? (
                <p className="timeParagraph">{FormatTimeAgo(updatedAt)}</p>
            ) : (
                <br />
            )}
            {props.comment.comment}
        </ListGroup.Item>
    </>
    )
}