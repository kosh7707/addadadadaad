export interface UserInfo {
  imageUrl: string;
  name: string;
}

export interface UserDetailInfo extends UserInfo {
  description: string;
}

export interface DiaryInfo {
  diary_id: number;
  date: string;
  emoji: string;
  title: string;
  content: string;
}
