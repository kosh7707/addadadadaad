export interface UserInfo {
  id: number;
  imageUrl: string;
  name: string;
}

export interface UserDetailInfo extends UserInfo {
  description: string;
}
