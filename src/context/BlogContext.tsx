import React, {createContext, useContext, useEffect, useState} from 'react';
import {Blog, BlogContextValue} from '../model/Blog';
import {getBlogList, createBlog as createUserBlog} from '../api/blog';
import {useAuth} from './AuthContext';

// @ts-ignore
const BlogContext = createContext<BlogContextValue>();

function useBlog() {
  return useContext(BlogContext);
}

function BlogProvider({children}: Props) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const {auth} = useAuth();

  useEffect(() => {
    getBlogs();
  }, [auth]);

  const getBlogs = () => {
      if (auth) {
        getBlogList()
          .then(res => {
            setBlogs(
              res.data.Items.map(val => {
                let blog: Blog = {
                  user: val.user.S,
                  body: val.body.S,
                  date: val.date.S,
                };
                return blog;
              }),
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    createBlog = (blog: Blog) =>
      new Promise<{}>((resolve, reject) => {
        if (!auth) {
          reject(new Error('Only authorized user can create blogs!'));
        }
        createUserBlog(blog)
          .then(res => {
            getBlogs();
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });

  const value: BlogContextValue = {blogs, createBlog};
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

interface Props {
  children: React.ReactNode;
}

export {useBlog, BlogProvider};
