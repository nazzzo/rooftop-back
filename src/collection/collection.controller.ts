import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionDto } from './dto/collection.dto';
import { Collection } from './schemas/collection.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';



interface FollowCollectionProps{
    address : string,
    collection_address : string
}

@Controller('collection')
@ApiTags('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

    
    @Get()
    @ApiOperation({ summary: 'Get all collections' }) // 요청의 설명 추가
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns all collections' })
    async getAllCollections(@Query() query: ExpressQuery):Promise<Collection[]>{
        try{
            return await this.collectionService.getAllCollections(query)
        }catch(error){
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':address')
    @ApiOperation({ summary: 'Get specific collection by address' })
    @ApiParam({ name: 'address', type: String, description: 'Collection address' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns the collection' })
    async getCollection(@Param('address') address: string): Promise<Collection[]> {
        try {
            return await this.collectionService.getCollection(address);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/check')
    @ApiOperation({ summary: 'Check if collection already exists for create collection' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns the found collection' })
    async findCollection(@Body() body) {
        try {
            return await this.collectionService.find(body);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
  
    @Post('/follow')
    @ApiOperation({ summary: 'Follow specific collection' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns updated result of collection' })
    async followCollection(@Body() data: FollowCollectionProps) {
      try {
        const {address,collection_address} = data
        return await this.collectionService.createFollow(address,collection_address)
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Post('/create')
    @ApiOperation({ summary: 'Create collection' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns created result onf collection' })
    async createCollection(@Body() collectionDto: CollectionDto): Promise<Collection> {
        try {
            return await this.collectionService.create(collectionDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }
  
    @Put('/update')
    @ApiOperation({ summary: 'Modify collection' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns updated result of collection' })
    async updateUser(@Body() updateProps ): Promise<Collection> {
        return this.collectionService.update(updateProps)
    }
}

