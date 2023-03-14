import { Controller, Get } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/')
  @Get('/main')
  async home() {
    return 'Hello Midwayjs!';
  }
}
