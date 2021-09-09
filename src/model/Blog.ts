export interface Blog {
  user: string;
  body: string;
  date: string;
}

export interface BlogRes {
  user: {
    S: string;
  };
  date: {
    S: string;
  };
  body: {
    S: string;
  };
}

export interface BlogResBody {
  Count: number;
  Items: BlogRes[];
  ScannedCount: number;
}

export interface BlogContextValue {
  blogs: Blog[];
  createBlog: (blog: Blog) => Promise<{}>;
}
