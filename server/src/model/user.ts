import mongoose, { Document, Model } from "mongoose";

// User Document Type
export interface UserType extends Document {
  googleId?: string;
  githubId?: string;
  name: string;
  email?: string;
  avatar: string;
}

// Model Document Type
export interface UserModelType extends Model<UserType> {
  findOrCreate({
    provider,
    providerId,
    email,
    name,
    avatar,
  }: {
    provider: "google" | "github";
    providerId: string;
    email: string;
    name: string;
    avatar?: string;
  }): Promise<UserType>;
}
// Creating Schema
const userSchema = new mongoose.Schema<UserType>({
  googleId: { type: String, unique: true },
  githubId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, unique: true },
  avatar: { type: String, required: false },
});

// Custom methods that find or Create User
userSchema.statics.findOrCreate = async function ({
  provider,
  providerId,
  email,
  name,
  avatar,
}: {
  provider: "google" | "github";
  providerId: string;
  email: string;
  name: string;
  avatar: string;
}) {
  let user = await this.findOne({ [`${provider}Id`]: providerId });
  if (!user) {
    user = await this.create({
      [`${provider}Id`]: providerId,
      name,
      email,
      avatar,
    });
  }
  return user;
};

// Create the User model
const User = mongoose.model<UserType, UserModelType>("User", userSchema);
export default User;
