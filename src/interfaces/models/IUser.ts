import { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  noHp: string;
  password: string;
  roles?: string[];
}

export default IUser;
