import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionDto } from './dto/collection.dto';
import { Collection } from './schemas/collection.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';


@Controller('collection')
export class CollectionController {
    constructor(private collectionService: CollectionService) { }

    @Get()
    async getAllCollections(@Query() query: ExpressQuery):Promise<Collection[]>{
        try{
            return await this.collectionService.getAllCollections(query)
        }catch(error){
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':address')
    async getCollection(@Param('address') address: string): Promise<Collection[]> {
        try {
            return await this.collectionService.getCollection(address);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/check')
    async findCollection(@Body() body) {
        try {
            return await this.collectionService.find(body);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
  
    @Post('/follow')
    async followCollection(@Body() data: FollowCollectionProps) {
      try {
        const {address,collection_address} = data
        return await this.collectionService.createFollow(address,collection_address)
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Post('/create')
    async createCollection(@Body() collectionDto: CollectionDto): Promise<Collection> {
        try {
            return await this.collectionService.create(collectionDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }

    @Put('/update')
    async updateUser(@Body() updateProps ): Promise<Collection> {
        return this.collectionService.update(updateProps)
    }
}