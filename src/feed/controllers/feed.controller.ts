import { Body, Controller, Get, Post, Put, Request } from '@nestjs/common';
import { Delete, Param, Query, UseGuards } from '@nestjs/common/decorators';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';

@Controller('feed')
export class FeedController {

  constructor(private feedService: FeedService) { }

  @UseGuards(JwtGuard)
  @Post()
  createPost(@Body() feedPost: FeedPost, @Request() req): Observable<FeedPost> {
    return this.feedService.createPost(req.user, feedPost)
  }

  // @Get()
  // findAllPosts(): Observable<FeedPost[]> {
  //   return this.feedService.findAllPosts()
  // }

  @Get()
  findSelectedPost(
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 20
  ): Observable<FeedPost[]> {
    limit = limit > 20 ? 20 : limit
    return this.feedService.findPosts(offset, limit)
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body() feedPost: FeedPost,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost)
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deletePost(
    @Param('id') id: number
  ): Observable<DeleteResult> {
    return this.feedService.deletePost(id)
  }
}
