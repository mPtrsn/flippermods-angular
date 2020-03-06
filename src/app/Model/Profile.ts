export interface Profile {
  id: number;
  username: string;
  passwordMD5: string;
  email: string;
  tiltValue: number;
  authData?: string;
}


export interface ProfileInfo {
  username: string;
  passwordMD5: string;
}
