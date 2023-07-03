import { BadRequestException, Injectable, NotFoundException, Query, UnauthorizedException } from '@nestjs/common';
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

    async getAllCollections(): Promise<Collection[]> {
        try {
            const getCollections = await this.collectionModel.find().exec()

            if (!getCollections) {
                throw new NotFoundException('Collection not found')
            }

            console.log("service Collections : ", getCollections)

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

    async createFollow(address :string , collection_address:string):Promise<Collection>{
        if(!address) throw new BadRequestException('Your Address is Not Found !')

        const [followDupulicate] = await this.collectionModel.find({
            address : collection_address
        })

        console.log("followDupulicate : ", followDupulicate.favorite)
        
        if(followDupulicate.favorite.includes(address)){ 
            // 값이 있으면 ? 그 값을 지운다.
            const updateCollectionFollow = await this.collectionModel.findOneAndUpdate(
                { address: collection_address },
                { $pull: { favorite:address } },
                {new:true}
            )
            console.log('값이 있으면 ? 그값을 지운다. return ' , updateCollectionFollow)
            return updateCollectionFollow
        }else{
            const updateCollectionFollow = await this.collectionModel.findOneAndUpdate(
                { address: collection_address },
                { $push : { favorite:address } },
                {new:true}
            )

            console.log('값이 없으면 ? 그값을 추가시킨다. return ' , updateCollectionFollow)
            return updateCollectionFollow
        }
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
      
      
      
      
      
      