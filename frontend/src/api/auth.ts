import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const signUp = async ({
  userId,
  userPw,
  description,
}: {
  userId: string;
  userPw: string;
  description: string;
}) => {
  try {
    const response = await axios.post('/api/auth/register', {
      user_id: userId,
      user_pw: userPw,
      description: description,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const signIn = async ({ userId, userPw }: { userId: string; userPw: string }) => {
  try {
    const response = await axios.post('/api/auth/login', {
      user_id: userId,
      user_pw: userPw,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const signOut = async () => {
  try {
    const response = await axios.get('/api/auth/logout');
    return response;
  } catch (error: any) {
    return error.response;
  }
};
