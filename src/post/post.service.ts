import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel
      .aggregate()
      .lookup({
        from: 'Users',
        localField: 'authorId',
        foreignField: '_id',
        as: 'author',
      })
      .unwind('$author')
      .project({
        _id: 0,
        id: { $toString: '$_id' },
        slug: 1,
        title: 1,
        description: 1,
        content: 1,
        imageUrl: 1,
        authorId: { $toString: '$authorId' },
        categoryId: { $toString: '$categoryId' },
        views: 1,
        publishedAt: { $dateToString: { date: '$publishedAt' } },
        createdAt: { $dateToString: { date: '$createdAt' } },
        updatedAt: { $dateToString: { date: '$updatedAt' } },
        deletedAt: { $dateToString: { date: '$deletedAt' } },
        author: { name: 1 },
        category: { name: 1 },
      })
      .exec();
  }
}
