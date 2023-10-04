import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  collection: 'Posts',
})
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop()
  slug: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  authorId: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
