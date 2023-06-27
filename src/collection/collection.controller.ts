import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionDto } from './dto/collection.dto';
import { Collection } from './schemas/collection.schema';

@Controller('collection')
export class CollectionController {
    constructor(private collectionService: CollectionService) { }

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
        console.log(updateProps)
        return this.collectionService.update(updateProps)
    }
}
