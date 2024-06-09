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

export const getFollowedList = async ({ userId }: { userId: string }) => {
  try {
    const response = await axios.post('/api/follow/getfollowerlist', {
      user_id: userId,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const fetchFollow = async ({ userId }: { userId: string }) => {
  try {
    const response = await axios.post('/api/follow/follow', {
      followee_id: userId,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const fetchUnfollow = async ({ userId }: { userId: string }) => {
  try {
    const response = await axios.post('/api/follow/unfollow', {
      followee_id: userId,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
