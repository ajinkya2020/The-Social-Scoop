import React, { useEffect, useState } from 'react'
import './Post.css';
import { Avatar } from '@material-ui/core';
import { db } from './firebase';
import firebase from 'firebase';

function Post(props) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("")

    useEffect(() => {
        let unsubscribe;
        if(props.postId) {
            unsubscribe = db
                .collection("posts")
                .doc(props.postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                })
        }

        return () => {
            unsubscribe();
        };
    },[props.postId]);

    function postComment(event){
        event.preventDefault();

        db.collection("posts").doc(props.postId).collection("comments").add({
            text: comment,
            username: props.user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setComment('');
    }
    
    return (
        <div className="post">
            <div className="post-header">
                <Avatar 
                    className="post-avatar"
                    alt='ajinkya'
                    src={props.imageURL}
                />
                <h3>{props.username}</h3>
            </div>
            

            <img 
                className="post-image" 
                src={props.imageURL} 
                alt="ajinkya"
            />

            <p className="post-text"><strong> {props.username} </strong> {props.caption} </p>

            <div className="post-comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>
            
            {props.user && (
                <form className="post-commentBox">
                <input 
                    className="post-input"
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button 
                    className="post-button"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </button>
            </form>
            )}
            
        </div>
    )
}

export default Post
