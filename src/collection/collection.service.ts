import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Collection } from './schemas/collection.schema';
import { CollectionDto } from './dto/collection.dto';
import { ConfigService } from '@nestjs/config';

interface Query {
    search?: string;
}

@Injectable()
export class CollectionService {
    constructor(
        @InjectModel(Collection.name)
        private collectionModel: mongoose.Model<Collection>,
        private configService: ConfigService
    ) { }


    async getCollection(address: string): Promise<Collection[]> {
        try {
            // console.log(address)
            const collection = await this.collectionModel.find({ $or: [{ creator: address }, { address }] });
            // console.log(`get collection:: ${collection}`);
            if (!collection) {
                throw new NotFoundException('Collection not found');
            }
            return collection;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getAllCollections(query: Query): Promise<Collection[]> {
        try {
            if (query.search) {
                const keyword = new RegExp(query.search, "i"); // 대소문자 구분을 없애는 정규식
                const getSearchResult = await this.collectionModel
                    .find({ $or: [ { name: keyword }, { description: keyword } ]}).exec();

                return getSearchResult;
            }

            const getCollections = await this.collectionModel.find().exec()
            if (!getCollections) {
                throw new NotFoundException('Collection not found')
            }
            return getCollections
        }
        catch (e) {
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

    async update(updateProps) {
        console.log(`updateProps:`, updateProps);
        const { address, ...updateData } = updateProps;
        const collection = await this.collectionModel.findOne({ address });
        if (!collection) {
            throw new UnauthorizedException('collection not found');
        }
        if (updateProps.totalSales) {
            updateData.totalSales = collection.totalSales + updateData.totalSales;
            if (!collection.verified && collection.totalSales >= 5) {
                updateData.verified = true;
            }
        }

        const updatedCollection = await this.collectionModel.findOneAndUpdate(
            { address: address },
            updateData,
        );
        return updatedCollection;
    }
}





