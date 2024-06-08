import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const getDiary = async ({ userId, year, month }: { userId: string; year: number; month: number }) => {
  try {
    const response = await axios.post('/api/diary/getdiary', {
      user_id: userId,
      year: year,
      month: month,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const fetchDiary = async ({
  userId,
  date,
  emoji,
  title,
  content,
}: {
  userId: string;
  date: string;
  emoji: string;
  title: string;
  content: string;
}) => {
  try {
    const response = await axios.post('/api/diary/writediary', {
      user_id: userId,
      date,
      emoji,
      title,
      content,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
