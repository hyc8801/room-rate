import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  async findAll(@Req() request: Request): Promise<Cat[]> {
    console.log(request.query);
    return this.catsService.findAll();
  }

  @Post()
  // 要指定自定义响应头
  @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto): string {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
    return 'This action adds a new cat';
  }
  // 路由通配符
  @Get('ab*cd')
  // 状态码
  @HttpCode(204)
  findAll2() {
    return 'This route uses a wildcard';
  }

  @Get('redirect')
  // 重定向
  @Redirect('https://nestjs.com', 301)
  findAll3() {
    return 'This route uses a wildcard';
  }

  @Get('redirect2')
  // 动态重定向
  @Redirect('https://nestjs.com', 301)
  findAll4(@Query('version') version: string) {
    return { url: `https://docs.nestjs.com/${version}/` };
  }

  // 路由参数
  @Get('one1/:id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  // 路由参数
  @Get('one/:id')
  findOne2(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  // 路由参数
  @Get('demo1')
  async demo1(): Promise<any[]> {
    return [];
  }
}
