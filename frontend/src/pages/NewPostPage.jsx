import { useContext, useId, useState } from "react";
import styles from "../styles/Post.module.css";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import NavbarDos from "../components/Navbar/NavigationBar";



const NewPost = () => {
  const titleId = useId();
  const descriptionId = useId();
  const [imageurlId] = useId();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImageUrl] = useState("");
;
  const navigate = useNavigate();

  function urlHandler() {
    const url = document.getElementById(imageurlId).value;
    document.getElementById("preview-image").setAttribute("src", url)
  }
  

  const { auth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

   
     if (title === "") return alert("Completar campos")
     if (description === "") return alert("Completar campos")
     
    
    fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({ title: title, description: description, imageurl: imageurl }),
    }).then((res) => {
      if (res.ok)
      navigate("/post");
    });
  };

  return (
    <div>
      <NavbarDos />
      <h2 className={styles.h1}>Crear un nuevo Post</h2>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <div className="row col-sm">
          <input className="form-control" type="text" id={titleId} placeholder="Titulo" name="Titulo" value={title}
            onChange={(e) => {
              setTitle(e.target.value);}} />
          <label htmlFor={titleId} className="form-label"></label>
          <textarea className="form-control" type="text" id={descriptionId} rows="4" columns="8" name="descripcion" placeholder="descripcion" value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }} />
          <label htmlFor={descriptionId} className="form-label"></label>             
          <input className="form-control" type="url" id={imageurlId} placeholder="Link de imagen" name="Link de imagen" value={imageurl}
          onChange={(e) => {
            setImageUrl(e.target.value); urlHandler();
          }} />
          <label htmlFor={imageurlId} className="form-label"></label>
        </div>
          <div className={styles.btn_crear}>
        <img src="" className={styles.previewimage} alt="dasdad" id="preview-image" />
        <button className={styles.btn_common} id={styles["btn-create-preview"]} type="submit" >Crear</button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;