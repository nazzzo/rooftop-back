import { Body, Controller, Delete, Query, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { AirdropService } from './airdrop.service';
import { AirdropDto } from "./dto/airdrop.dto";
import { Airdrop } from "./schemas/airdrop.schema";
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('airdrop')
export class AirdropController {
    constructor(private airdropService: AirdropService) {}

    @Get('')
    async getAirdrops(@Query() query: ExpressQuery):Promise<Airdrop[]>{
        try{
            return await this.airdropService.findAll(query)
        }catch(error){
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':address')
    async getAirdrop(@Param('address') address: string ) {
        try {
            console.log(address)
            return await this.airdropService.find(address)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('/create')
    async postAirdrop(@Body() auctionDto: AirdropDto): Promise<Airdrop> {
        try {
            return await this.airdropService.create(auctionDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }

    @Post('/checkDuplicate')
    async postCheckDuplicate(@Body() body) {
        try {
            return await this.airdropService.findOne(body);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/update')
    async putAirdrop(@Body() updateProps): Promise<Airdrop> {
        try {
            return await this.airdropService.update(updateProps)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }

    @Delete(':address')
    async deleteAuction(@Param('address') address: string): Promise<string> {
        console.log(`delete:`, address)
        try {
            await this.airdropService.delete(address)
            return '삭제 완료'
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
