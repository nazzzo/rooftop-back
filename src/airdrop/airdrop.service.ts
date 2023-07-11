import { Injectable, BadRequestException, NotFoundException, } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Airdrop } from "./schemas/airdrop.schema";
import mongoose from "mongoose";
import { AirdropDto } from "./dto/airdrop.dto";
import { Query } from "express-serve-static-core"


@Injectable()
export class AirdropService {
    constructor(
        @InjectModel(Airdrop.name)
        private airdropModel: mongoose.Model<Airdrop>
    ) { }

    async findAll(query: Query): Promise<Airdrop[]> {
        try {
            const getAirdrops = await this.airdropModel.find().exec()
            if (!getAirdrops) {
                throw new NotFoundException('Tables not found')
            }
            return getAirdrops
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async find(NFTaddress: string) {
        try {
            const getAirdrop = await this.airdropModel.findOne({ NFTaddress })
            return getAirdrop
        } catch (e) {
            throw new Error(e)
        }
    }

    async findOne(body): Promise<Airdrop> {
        try {
            const { NFTaddress } = body;
            const cart = await this.airdropModel.findOne({ NFTaddress });
            return cart;
        } catch (e) {
            throw new Error(e);
        }
    }

    async create(airdropDto: AirdropDto): Promise<Airdrop> {
        console.log(airdropDto)
        try {
            const newAirdrop = await this.airdropModel.create(
                airdropDto
            )
            return newAirdrop
        } catch (e) {
            throw new Error(e)
        }
    }

    async update(updateProps) {
        console.log(`updateProps:`, updateProps);
        const { NFTaddress, target, ...updateData } = updateProps;
        const airdrop = await this.airdropModel.findOne({ NFTaddress });
        if (!airdrop) {
            throw new BadRequestException('Airdrop not found');
        }

        const updatedTargets = [...new Set([...airdrop.targets, ...target])]; // 중복 체크를 위한 Set 사용

        if (updatedTargets.length > 10) {
            throw new Error('Target limit exceeded');
        }

        const updatedAirdrop = await this.airdropModel.findOneAndUpdate(
            { NFTaddress: NFTaddress },
            { ...updateData, targets: updatedTargets },
            { new: true }
        );
        return updatedAirdrop;
    }

    async delete(NFTaddress: string): Promise<void> {
        try {
            await this.airdropModel.deleteOne({ NFTaddress })
        } catch (e) {
            throw new Error(e);

        }
    }
}
