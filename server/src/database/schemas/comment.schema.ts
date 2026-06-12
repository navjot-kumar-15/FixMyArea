import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({
  timestamps: true,
  collection: 'comments',
})
export class Comment extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'Report',
    required: true,
  })
  report_id: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user_id: Types.ObjectId;

  @Prop({
    trim: true,
    maxlength: 1000,
    required: true,
  })
  message: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Comment',
    default: null,
  })
  parent_comment_id: Types.ObjectId;

  @Prop({
    default: false,
  })
  is_edited: boolean;

  @Prop()
  edited_at: Date;

  @Prop({
    default: false,
  })
  is_deleted: boolean;

  @Prop()
  deleted_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.index({ report_id: 1, createdAt: 1 ,parent_comment_id:1});