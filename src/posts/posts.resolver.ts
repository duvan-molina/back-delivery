import { Resolver, Query } from '@nestjs/graphql';
import { Post } from './posts.entity';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => [Post])
  post() {
    return this.postsService.findAll();
  }
}
