import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import NavbarDos from "../components/Navbar/NavigationBar"; 
import Post from "../components/posteo/Post";
import styles from "../styles/Post.module.css";
  

function AllpostsPage() {   
    const [posts, setPosts] = useState([]); 
    const [post, setPost] = useState({ post:[], author:"", comments:[] })
    
    const getPost = useCallback(() => {
    
    fetch(`${API_URL}/allposts/public`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => setPosts(data))
    .catch((err) => console.log(err));

    })
    useEffect(() => {
        getPost(); 
    });
  
    return (
    <div>
      <NavbarDos />
        <div className="">
          <h1 className={styles.h1}>Los secretos del viajero</h1>
          {posts.length === 0 ? <p className={styles.p}>No tienes creado ningún Post.</p> : null}
          <main className="">
            <Post getPost={getPost} posts={posts} />          
          </main>
          <div>            
          {post.comments.map((comment) => {              
            return (                   
              <div className="row d-flex justify-content-center" id="comment-container">
                <div className="col-md-12" id="comment-box">
                  <div className="headings d-flex justify-content-center align-items-center" id="comment-subcon">                  
                    <div className="card" id="comment-card">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="user d-flex flex-row align-items-center">
                            <img src={comment.author.avatar} width="40" className="user-img rounded-circle mr-2" id="card-image" />
                            <span><small className="font-weight-bold text-primary">{comment.author.username}</small> <small className="font-weight-bold">dice: {comment.description}</small></span>          
                          </div>      
                        </div>              
                    </div>
                  </div>
                </div>
              </div>
            )})}      
        </div>
        </div>
    </div>
  ); 
    
};

export default AllpostsPage;
