import React from 'react'
import '../CSS/PostDetail.css'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
export default function PostDetail({ item, toggleDetails }) {
    var picLink="https://cdn-icons-png.flaticon.com/128/64/64572.png"
    const navigate = useNavigate();
    const notifyB = (msg) => toast.success(msg)
    const removePost = (postId) => {
        if (window.confirm("Do you really want to delete this post?")) {
            fetch(`/deletePost/${postId}`, {
                method: 'delete',
                headers: {

                    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                },
            }).then((res) => res.json()).then((result) => {
                console.log(result)
                notifyB("Successfully deleted your post")
                navigate("/")
                toggleDetails();
                // console.log("Successfully deleted")
            })

        }

    }
    return (
        <div>
            <div className="showComment" >
                <div className="container">
                    <div className="postPic">
                        <img src={item.photo} alt="" />
                    </div>
                    <div className="details">
                        {/* cardheader */}
                        <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
                            <div className="card-pic">
                                <img
                                    src={item.postedBy.Photo?item.postedBy.Photo:picLink}
                                    alt=""
                                />
                                <h5>{item.postedBy.name}</h5>
                                <div className="deletePost"><span className="material-symbols-outlined" onClick={() => { removePost(item._id) }}>
                                    delete
                                </span></div>
                            </div>
                        </div>

                        {/* commentsection */}
                        <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
                            {item.comments.map((comment) => {
                                return (<p className='comm'>
                                    <span className='commenter' style={{ fontWeight: "600", color: "rgb(72, 72, 72)" }}>{comment.postedBy.name}{" "}</span>
                                    <span className='commentText' style={{ color: "rgba(46, 44, 44, 0.815)" }}>{comment.comment}</span>
                                </p>)
                            })}

                        </div>
                        {/* card-content */}
                        <div className="card-content">

                            <p>{item.likes.length} Likes </p>
                            <p>{item.body}</p> </div>
                        {/* add-comment */}
                        <div className="add-comment">
                            <span className="material-symbols-outlined">mood</span>
                            <input type="text" placeholder="add a comment"
                            // value={comment} onChange={(e) => { setComment(e.target.value)
                            //  }}
                            />
                            {/* <button type="button" onClick={() => { makeComment(comment, item._id); toggleComment() }}>POST</button> */}
                        </div>

                    </div>
                </div>
                <div className="close-comment"
                    onClick={() => { toggleDetails() }}
                >
                    <span className="material-symbols-outlined material-symbols-outlined-comment" >
                        close
                    </span>
                </div>
            </div>

        </div>
    )
}
