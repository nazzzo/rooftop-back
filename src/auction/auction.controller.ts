import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { AuctionService } from "./auction.service";
import { Auction } from "./schemas/auction.schema";
import { AuctionDto } from "./dto/auction.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('auction')
@ApiTags('auction')
export class AuctionController {
    constructor(private auctionService: AuctionService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get auction information by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Auction ID' }) // 경로 파라미터 추가
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns the auction' })
    async getAuction(@Param('id') id: number ) {
        try {
            console.log(id)
            return await this.auctionService.find(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('/add')
    @ApiOperation({ summary: 'Add new auction' })
    @ApiBody({ type: AuctionDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Returns the added auction' })
    async postAuction(@Body() auctionDto: AuctionDto): Promise<Auction> {
        try {
            return await this.auctionService.create(auctionDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete ended / canceled auction' })
    @ApiParam({ name: 'id', type: Number, description: 'Auction ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns a success message' })
    async deleteAuction(@Param('id') id: number): Promise<string> {
        try {
            await this.auctionService.delete(id)
            return 'The auction has ended'
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
