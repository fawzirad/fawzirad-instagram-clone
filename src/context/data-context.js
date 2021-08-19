import React, { createContext, useEffect, useState, useContext } from "react";
import { db, timestamp, storage } from "../firebase";
import { useAuth } from "./auth-context";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const getUsers = () => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }))
      );
    });
  };

  const getSingleUser = (userId) => {
    let _user = null;
    db.collection("users").onSnapshot((snapshot) => {
      _user = snapshot.docs
        .map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }))
        .find((_user) => _user.userId === userId);
    });
    db.collection("posts").onSnapshot((snapshot) => {
      setUserProfile({
        user: _user,
        posts: [
          ...snapshot.docs
            .map((doc) => ({
              docId: doc.id,
              ...doc.data(),
            }))
            .filter((_post) => _post.uid === userId),
        ],
      });
    });
  };

  const getPosts = () => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  };

  // const createPostsLike = () => {}

  const createPostComment = (postId, comment, user) => {
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: timestamp(),
    });
  };

  const getPostComments = (postId) => {
    let unsubscribe;
    if (postId) {
      setComments([])
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          const _comments = snapshot.docs.map((doc) => {
            return {
              docId: doc.id,
              ...doc.data(),
            };
          });
          setComments(_comments);
        });
    }

    return unsubscribe;
  };

  const likePost = (postId) => {
    if (!user) return;

    const _docRef = db.collection("posts").doc(postId);
    _docRef.get().then((_doc) => {
      if (_doc.exists) {
        const { likes } = _doc.data();

        const isLiked = likes.find((_uid) => _uid === user.uid);
        const removeLike = likes.filter((_uid) => _uid !== user.uid);

        if (!isLiked) {
          _docRef.update({
            likes: [...likes, user.uid],
          });
        } else {
          _docRef.update({
            likes: [...removeLike],
          });
        }
      }
    });
  };

  useEffect(() => {
    getPosts();
    getUsers();

    return getUsers;
  }, []);

  const createPost = ({ image, caption }) => {
    if (!user) return;

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => alert(error.message),
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection("posts").add({
              timestamp: timestamp(),
              caption: caption,
              imageUrl: url,
              username: user.displayName,
              uid: user.uid,
              likes: [],
            });

            setProgress(0);
          });
      }
    );
  };
  const values = {
    users,
    posts,
    comments,
    getPostComments,
    createPostComment,
    likePost,
    progress,
    createPost,
    getSingleUser,
    userProfile,
  };
  return <DataContext.Provider value={values} children={children} />;
};

const useData = () => {
  return useContext(DataContext);
};

export { useData, DataProvider };
