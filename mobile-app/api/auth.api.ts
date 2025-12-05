import axios from 'axios';

export const loginUser = async (email: string, otp: string) => {
  return await axios.post(`${process.env.SERVER_URL}/customer/login`, { email, otp });
};

export const sendOTP = async (email: string) => {
  return await axios.post(`${process.env.SERVER_URL}/otp`, { email });
};
