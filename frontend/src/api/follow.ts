import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const getFollowingList = async ({ userId }: { userId: string }) => {
  try {
    const response = await axios.post('/api/follow/getfollowinglist', {
      user_id: userId,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
