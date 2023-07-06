import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { AuctionService } from "./auction.service";
import { Auction } from "./schemas/auction.schema";
import { AuctionDto } from "./dto/auction.dto";

@Controller('auction')
export class AuctionController {
    constructor(private auctionService: AuctionService) {}

    @Get(':id')
    async getAuction(@Param('id') id: number ) {
        try {
            console.log(id)
            return await this.auctionService.find(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('/add')
    async postAuction(@Body() auctionDto: AuctionDto): Promise<Auction> {
        try {
            return await this.auctionService.create(auctionDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }

    @Delete(':id')
    async deleteAuction(@Param('id') id: number): Promise<string> {
        try {
            await this.auctionService.delete(id)
            return '경매가 종료되었습니다'
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}