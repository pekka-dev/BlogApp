import axios, {AxiosPromise} from 'axios';
import {Blog, BlogResBody} from '../model/Blog';

const blogInstance = axios.create({
  baseURL: 'https://m0jxa0gz8l.execute-api.ap-south-1.amazonaws.com',
});

function getBlogList(): AxiosPromise<BlogResBody> {
  return blogInstance({
    method: 'GET',
    url: '/Test/blog',
  });
}

function createBlog(blog: Blog): AxiosPromise<{}> {
  return blogInstance({
    method: 'POST',
    url: '/Test/blog',
    data: blog,
  });
}

export {getBlogList, createBlog};
