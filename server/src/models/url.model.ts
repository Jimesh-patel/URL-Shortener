import mongoose, { Document, Schema } from "mongoose";

export interface IUrl extends Document {
  hash: string;
  originalUrl: string;
  visits: number;
  createdAt: Date;
  expiresAt?: Date;
}

const urlSchema = new Schema<IUrl>(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    originalUrl: {
      type: String,
      required: true
    },
    visits: {
      type: Number,
      default: 0
    },
    expiresAt: {
      type: Date
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

export const Url = mongoose.model<IUrl>("Url", urlSchema);