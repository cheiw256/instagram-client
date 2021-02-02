import React, {useState, useEffect, forwardRef} from 'react';
import {db} from "../firebase";
import "../styles/style.css";
import Avatar from "@material-ui/core/Avatar";

const Post = forwardRef(({id, item, user, ...otherProps}, ref) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        let unsubscribe;
        if (id) {
          unsubscribe = db
            .collection("posts")
            .doc(id)
            .collection("comments")
            .onSnapshot((snapshot) => {
              setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
  
        return () => {
          unsubscribe();
        };
      }, [id]);

      const postComment = (e) => {
        e.preventDefault();
  
        db.collection("posts").doc(id).collection("comments").add({
          text: comment,
          username: user.displayName,
        });
        setComment("");
      };


    return(
        <div className="post" ref={ref}>
            <div className="post-header">
                <Avatar
                    className="post-avatar"
                    alt={item.username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{item.username}</h3>
            </div>

                <img className="post-image" src={item.imageUrl} alt="post" />
                <h4 className="post-text">
                    {item.username} <span className="post-caption">{item.caption}</span>
                </h4>

            <div className="post-comments">
                {comments.map((comment) => (
                    <p>
                        <b>{comment.username}</b>{comment.text}
                    </p>
                ))}
            </div>

            {user && (
            <form className="post-commentBox">
                <input
                    className="post-input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    disabled={!comment}
                    className="post-button"
                    type="submit"
                    onClick={postComment}
                >
                Post
                </button>
            </form>
            )}
      </div>
    )
})

export default Post;
