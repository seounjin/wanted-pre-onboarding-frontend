import axios from "axios";
import { getAccessToken } from "../utils/getAccessToken";

const accessToken = getAccessToken('accessToken');

export const axiosClient = axios.create({
  baseURL: 'https://www.pre-onboarding-selection-task.shop',
  headers: { 'Content-Type': 'application/json', Authorization: accessToken ? `Bearer ${accessToken}` : '' },
});
