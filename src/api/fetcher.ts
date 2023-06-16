import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = 'https://www.pre-onboarding-selection-task.shop';

const fetcher = async (
  method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch',
  url: string,
  data?: any,
  ...rest: AxiosRequestConfig[]
) => {
  try {
    const res = await axios[method](url, data, ...rest);
    return res;
  } catch (error) {
    console.log("error", error)
  }
};

export default fetcher;