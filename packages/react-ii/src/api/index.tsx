import server from "./server";

interface RequestOptions {
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}

const get = async (options: RequestOptions) => {
  const { url, params = {} } = options || {};

  return server({
    url,
    method: "get",
    params,
  });
};

const post = async (options: RequestOptions) => {
  const { data, url, params } = options || {};
  return server({
    url,
    method: "POST",
    data,
    params,
  });
};

const patch = async (options: RequestOptions) => {
  const { data, url } = options || {};
  return server({
    url,
    method: "PATCH",
    data,
  });
};

export default {
  get,
  post,
  patch,
};
