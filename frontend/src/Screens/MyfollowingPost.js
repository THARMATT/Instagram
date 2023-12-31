import React, { useEffect, useState } from 'react';
import '../CSS/Home.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
export default function MyfollowingPost() {
  var picLink="https://cdn-icons-png.flaticon.com/128/64/64572.png"
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("")
  const [show, setShow] = useState(false)
  const [item, setItem] = useState([])

  const notifyA=(msg)=>toast.error(msg)
const notifyB=(msg)=>toast.success(msg)
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/signup');
    }


    // Fetching all posts
    fetch('/myfollowingpost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err)); // Use console.error for error logging
  }, [navigate]); // Include navigate as a dependency

  //togglecomment
  const toggleComment = (posts) => {
    if (show) {
      setShow(false)
    }
    else {
      setShow(true)
      setItem(posts);

    }
  }

  const likePost = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result
          } else {
            return posts
          }
        })
        setData(newData)
        console.log(result)
      })
      .catch((error) => console.error(error));
  };

  // Unlike
  const unlikePost = (id) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result
          } else {
            return posts
          }
        })
        setData(newData)
        console.log(result)
      })
      .catch((error) => console.error(error));
  };



  //function for comment
  const makeComment = (text, id) => {
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ text: text, postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result
          } else {
            return posts
          }
        })
        setData(newData)
        setComment("")
        notifyB("Comment Posted")
        console.log(result)
      })
      .catch((error) => console.error(error));

  }
  return (
    <div>
      <div className="home">
        {/* card */}
        {data.map((posts) => (
          <div className="card" key={posts._id}>
            {/* cardheader */}
            <div className="card-header">
              <div className="card-pic">
                <img
                  src={posts.postedBy.Photo?posts.postedBy.Photo:picLink}
                  alt=""
                />
                <h5>
                  <Link to={`/profile/${posts.postedBy._id}`}>
                  {posts.postedBy.name}

                  </Link>
                  </h5>
              </div>
            </div>
            {/* card-img */}
            <div className="card-img">
              <img src={posts.photo} alt="" />
            </div>
            {/* card-content */}
            <div className="card-content">

              {
                posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ? (<span
                  className="material-symbols-outlined"
                  id="likeBtn"
                  onClick={() => {
                    unlikePost(posts._id);
                  }}
                >
                  favorite
                </span>) : (<span
                  className="material-symbols-outlined"
                  onClick={() => {
                    likePost(posts._id);
                  }}
                >
                  favorite
                </span>)
              }


              <span className="material-symbols-outlined" onClick={()=>{toggleComment(posts)}}>mode_comment</span>
              <span className="material-symbols-outlined">send</span>
              <p>{posts.likes.length} Likes </p>
              <p>{posts.body}</p>
              <p style={{ color: "rgb(173,173,173)", cursor: "pointer" }} onClick={() => { toggleComment(posts) }}>View all comments</p>
            </div>
            {/* add-comment */}
            <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input type="text" placeholder="add a comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
              <button type="button" onClick={() => { makeComment(comment, posts._id) }}>POST</button>
            </div>
          </div>

        ))}















        {/* show comment  */}

        {
          show && (
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
                    <input type="text" placeholder="add a comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
                    <button type="button" onClick={() => { makeComment(comment,item._id); toggleComment()}}>POST</button>
                  </div>

                </div>
              </div>
              <div className="close-comment" onClick={() => { toggleComment() }}>
                <span className="material-symbols-outlined material-symbols-outlined-comment" >
                  close
                </span>
              </div>
            </div>
          )}

      </div>
    </div>
  );
}
