import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Headers,
  createRequestParamDecorator,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { User } from '../interface';

// 实现装饰器
export const Token = () => {
  return createRequestParamDecorator(ctx => {
    return ctx.headers.token;
  });
};

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  // 使用装饰器
  async invoke(@Token() token: string) {
    console.log(token);
  }

  @Get('/')
  async getUser(@Query('id') id: string): Promise<User> {
    const query = this.ctx.query;
    // {
    //   uid: '1',
    //   sex: 'male',
    // }

    // set cookie
    this.ctx.cookies.set('foo', 'bar', { encrypt: true });
    // get cookie
    this.ctx.cookies.get('foo', { encrypt: true });

    // 获取 Session 上的内容
    // const userId = this.ctx.session.userId;
    // const posts = await this.ctx.service.post.fetch(userId);

    // 修改 Session 的值
    this.ctx.session.visited = this.ctx.session.visited
      ? this.ctx.session.visited + 1
      : 1;

    console.log({ query, session: this.ctx.session, cookie: this.ctx.cookies });

    return {
      id,
      name: id + '-name',
      age: 0,
    };
  }

  //   @Get('/')
  //   async getUser(): Promise<User> {
  //     const query = this.ctx.query;
  //     // {
  //     //   uid: '1',
  //     //   sex: 'male',
  //     // }
  //   }

  // POST /user/ HTTP/1.1
  // Content-Type: application/json; charset=UTF-8
  //
  // {"uid": "1", "name": "harry"}
  @Post('/updateUser')
  async updateUser(@Body() user: User): Promise<User> {
    // 1. API获取
    // const body = this.ctx.request.body as User;
    // return body

    // 2. 获取整个 body
    // user 等价于 ctx.request.body 整个 body 对象
    // => output user
    // {
    //   uid: '1',
    //   name: 'harry',
    // }
    return user;
  }

  @Post('/updateUserV2')
  async updateUserV2(
    @Body() user: User,
    @Query('pageIdx') pageIdx: number
  ): Promise<User> {
    // user 从 body 获取
    // pageIdx 从 query 获取

    return user;
  }

  @Get('/:uid')
  async getParamAndHeader(
    @Param('uid') uid: string,
    @Headers('cache-control') cacheSetting: string
  ) {
    // const params = this.ctx.params;
    // const cacheSetting = this.ctx.get('cache-control');

    return { uid, cacheSetting };
  }

  // 上传
  //   @Post('/')
  //   async updateUser(
  //     @Body('id') id: string,
  //     @RequestPath() p: string,
  //     @RequestIP() ip: string
  //   ): Promise<User> {
  // const ip = this.ctx.ip
  // const path = this.ctx.path
  // }
}
