import { useState, useRef } from "react";
import domtoimage from "dom-to-image";
import { app } from "../firebase.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Markdown from "../Markdown/Markdown";
import arrow from "../img/arrow.png";
import "./Maker.scss";

const storage = getStorage(app);

export default function App({ name }) {
  const [text, setText] = useState("");
  const [path, setPath] = useState("");
  const [imgUrl, setImgUrl] = useState();
  const button = useRef(null);

  return (
    <section className={"maker " + name}>
      <h5>{name} Button</h5>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          domtoimage.toBlob(button.current).then(function (blob) {
            const imgName = `${text}-${new Date().getTime()}`;
            const storageRef = ref(storage, "nav-buttons/" + imgName + ".png");
            uploadBytes(storageRef, blob).then((snapshot) => {
              getDownloadURL(
                ref(storage, "nav-buttons/" + imgName + ".png")
              ).then((url) => setImgUrl(url));
            });
          });
        }}>
        <div className="input-group">
          <label htmlFor="text">Text to Display</label>
          <input
            id="text"
            type="text"
            onInput={(ev) => setText(ev.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="input-group">
          <label htmlFor="path">Path URL</label>
          <input
            id="path"
            type="text"
            placeholder="Relative path"
            onInput={(ev) => setPath(ev.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="result">
          <div className="nav-button" ref={button}>
            <span className="text">{text}</span>
            <div className="icon">
              <img src={arrow} />
            </div>
          </div>
        </div>
        <button type="submit" className="create">
          Create
        </button>
      </form>
      {imgUrl ? (
        <Markdown
          imgUrl={imgUrl}
          path={path}
          align={name === "Prev" ? "left" : "right"}
        />
      ) : null}
    </section>
  );
}
