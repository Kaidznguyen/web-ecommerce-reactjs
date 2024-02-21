import React, {useState, useEffect} from "react";
import "../assets/user-page/main.css";
import "../assets/user-page/grid-system.css";
import "../assets/user-page/reponsive.css";
import "../assets/user-page/main.js";
import PostAPI from "../Service/PostAPI.js"
import moment from 'moment';
export default function Hotnew() {
    const [post, setPost] =useState([]);
    useEffect(()=>{
        async function feetchPost(){
            try{
                const data = await PostAPI.Newpost();
                setPost(data);
                console.log(data)
            }catch(error){
                console.error("Erorr: ",error);
            }
        }
        feetchPost();
    },[]);
    const formattedDateTime = moment(post.updated_at).format('dddd DD/MM/YYYY HH:mm:ss');
  return (
    <div>
      <div class="index-product-title" style={{ marginBottom: "80px" }}>
        <a href="blog.html">Bài viết mới nhất</a>
      </div>
      <div class="newspaper-content">
        <div class="row sm-gutter">
            {post.map((post) => (
                <div class="col l-4 c-12 m-4">
            <a href="blog-detail.html" class="content-newspaper-item">
              <img src={"http://localhost:8080/" + post.img} alt="" title={post.title} />
            </a>
            <div class="content-newspaper-time">
              <span>{formattedDateTime}</span>
            </div>
            <div class="content-newspaper-title">
              <a href="blog-detail.html">
                {post.title}
              </a>
            </div>
            <div class="content-newspaper">
            <span dangerouslySetInnerHTML={{ __html: post.description }} />
            </div>
          </div>
            ))}
          
        </div>
      </div>
    </div>
  );
}
