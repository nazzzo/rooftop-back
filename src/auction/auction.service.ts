import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Auction } from "./schemas/auction.schema";
import mongoose from "mongoose";
import { AuctionDto } from "./dto/auction.dto";
import { test } from "node:test";

@Injectable()
export class AuctionService {
    constructor(
        @InjectModel(Auction.name)
        private auctionModel: mongoose.Model<Auction>
    ) {}

    async find(id: number) {
        try {
            const auction = await this.auctionModel.findOne({ id })
            console.log("Service find data", auction)

            return auction
        } catch (e) {
            throw new Error(e)
        }
    }
    

    async create(auctionDto: AuctionDto): Promise<Auction> {
        try {
            const newAuction = await this.auctionModel.create(
                auctionDto
            )
            console.log('Service create data')

            return newAuction
        } catch(e) {
            throw new Error(e)
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.auctionModel.deleteOne({ id })
        } catch (e) {
            throw new Error(e);

        }
    }
}