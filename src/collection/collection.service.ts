import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Collection } from './schemas/collection.schema';
import { CollectionDto } from './dto/collection.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class CollectionService {
    constructor(
        @InjectModel(Collection.name)
        private collectionModel: mongoose.Model<Collection>,
        private configService: ConfigService
    ) { }

    async getCollection(address: string): Promise<Collection[]> {
        try {
            const collection = await this.collectionModel.find({ creator: address });
            console.log(`get collection::: ${collection}`);
            if (!collection) {
                throw new NotFoundException('Collection not found');
            }
            return collection;
        } catch (e) {
            throw new Error(e);
        }
    }

    async find(body: CollectionDto): Promise<Collection> {
        try {
            const client = this.configService.get('APP_URL')
            const { name, symbol, url } = body;
            const checkDuplicate = await this.collectionModel.findOne({
                $or: [{ name }, { symbol }, { url: `${client}/collections/${url}` }],
            });
            return checkDuplicate

        } catch (e) {
            throw new Error(e);
        }
    }

    async create(collectionDto: CollectionDto): Promise<Collection> {
        const client = this.configService.get('APP_URL')

        const newCollection = await this.collectionModel.create({
            ...collectionDto,
            url: `${client}/collections/${collectionDto.url}`
        })
        console.log(newCollection)

        return newCollection
    }
}
