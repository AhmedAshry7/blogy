'use client'
import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import Toolbar from "../components/Toolbar";

interface Post {
  title: string;
  body: string;
}

const Home: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
  const [isBodyValid, setIsBodyValid] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [toHome, setToHome] = useState<boolean>(false);
  const router = useRouter();

  const submit = async (thePost: Post) => {
    setTitle("");
    setBody("");
    try {
      toast.success("Blog submitted");
    } catch (error) {
      toast.error("Error submitting");
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleSend = () => {
    setIsTitleValid(true);
    setIsBodyValid(true);
    if (title === "") {
      setIsTitleValid(false);
      return;
    }

    if (body === "") {
      setIsBodyValid(false);
      return;
    }

    const newPost: Post = {
      title: title,
      body: body,
    };
    submit(newPost);
  };

  const handleCancel = () => {
    if (title !== "" || body !== "") {
      setShowModal(true);
    }
  };

  const handleDiscard = () => {
    setTitle("");
    setBody("");
    setShowModal(false);
    if (toHome) {
      router.push('/home');
    }
  };

  const homeClicked = () => {
    if (title !== "" || body !== "") {
      setToHome(true);
      setShowModal(true);
    } else {
      router.push('/home');
    }
  };

  return (
    <div className={styles.page}>
      <Toolbar isCreate={true} homeClicked={homeClicked} />
      <p className={styles.title}>Create Your Own Blog</p>
      <div className={styles.body}>
        <div className={styles.inputsContainer}>
          <div className={styles.inputArea}>
            <h3>Title</h3>
            <div className={styles.inputWrap}>
              <input 
                type="text" 
                required 
                placeholder="" 
                onChange={handleTitleChange} 
                value={title} 
                className={styles.inputBox} 
              />
              <label htmlFor="title">Enter the title</label>
            </div>
            {!isTitleValid && (<p className={styles.errorMessage}>Please enter a title</p>)}
          </div>
          <div className={styles.inputArea}>
            <h3>Body</h3>
            <textarea 
              onChange={handleBodyChange} 
              value={body} 
              className={styles.inputTextBox} 
            />
            {!isBodyValid && (<p className={styles.errorMessage}>Please add a body to your blog</p>)}
            <div className={styles.buttonsContainer}>
              <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
              <button className={styles.submitButton} onClick={handleSend}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.Xbutton} onClick={() => setShowModal(false)}>X</button>
            <h2>Discard blog?</h2>
            <p>You have a blog in progress. By clicking discard everything you wrote will be lost! Are you sure you want to discard it?</p>
            <div className={styles.modalButtons}>
              <button 
                className={styles.cancelButton2} 
                data-testid="cancelmodal" 
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className={styles.discardButton} onClick={handleDiscard}>Discard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
