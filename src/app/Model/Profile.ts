export interface Profile {
  id: number;
  username: string;
  passwordMD5: string;
  email: string;
  tiltValue: number;
}


export interface ProfileInfo {
  username: string;
  passwordMD5: string;
}
