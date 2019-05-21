import mongoose, { Schema } from "mongoose";

const storySchema = new Schema({
  story_id: Number,
  objectID: String,
  title: String,
  story_title: String,
  author: String,
  story_url: String,
  url: String,
  created_at_i: Number,
  created_at: Date,
  deleted: { type: Boolean, default: false }
});

// export const Story = mongoose.model<StoryDocument>("Story", storySchema);
export const Story = mongoose.model("Story", storySchema);
