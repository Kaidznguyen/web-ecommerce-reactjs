import React, {useState, useEffect} from "react";
import '../../../assets/user-page/main.css';
import '../../../assets/user-page/grid-system.css';
import '../../../assets/user-page/reponsive.css';
import "../../../assets/user-page/main.js";
import PostAPI from "../../../Service/PostAPI.js"
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons'
export default function Hotnew() {
    const [post, setPost] =useState([]);
    useEffect(()=>{
        async function feetchPost(){
            try{
                const data = await PostAPI.Newpost();
                setPost(data);
            }catch(error){
                console.error("Erorr: ",error);
            }
        }
        feetchPost();
    },[]);
  return (
    <div>
      <div className="index-product-title" style={{ marginBottom: "80px" }}>
        <Link to={'/Blog'}>Bài viết mới nhất</Link>
      </div>
      <div className="newspaper-content">
        <div className="row sm-gutter">
            {post.map((post) => (
                <div className="col l-4 c-12 m-4" key={post.id}>
            <Link to={`/Blog-Detail/${post.id}`} className="content-newspaper-item">
              <img src={"http://localhost:8080/" + post.img} alt="" title={post.title} />
            </Link>
            <div className="content-newspaper-time">
              <span>{moment(post.created_at).format("dddd DD/MM/YYYY HH:mm:ss")} <b style={{color:'var(--primary-color)', marginLeft:'20px'}}>{post.views} <FontAwesomeIcon icon={faEye} /></b></span>
            </div>
            <div className="content-newspaper-title">
              <Link to={`/Blog-Detail/${post.id}`}>
                {post.title}
              </Link>
            </div>
            <div className="content-newspaper">
            <span dangerouslySetInnerHTML={{ __html: post.description }} />
            </div>
          </div>
            ))}
          
        </div>
      </div>
    </div>
  );
}
