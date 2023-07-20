import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

@Controller('event')
@ApiTags('event') // 태그 추가
export class EventController {
    constructor(private eventService: EventService) { }

    @Get()
    @ApiOperation({ summary: 'Get all event logs' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns all event logs' })
    async getAllActivity(@Query() query: ExpressQuery) {
        try {
            return await this.eventService.findAll(query)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get event logs by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Activity ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns specific event logs' })
    async getActivity(@Param('id') id: number | string) {
        console.log(`getActivity :`, id)
        try {
            return await this.eventService.findById(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Get('leaderboard/:address')
    @ApiOperation({ summary: 'Get leaderboard for airdrop reward' })
    @ApiParam({ name: 'address', type: String, description: 'User address' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns the leaderboard' })
    async getLeaderBoard(@Param('address') address: string) {
        try {
            return await this.eventService.eventCount(address)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/trade/:address')
    @ApiOperation({ summary: 'Get trade summary for an address' })
    @ApiParam({ name: 'address', type: String, description: 'User address' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
    async getTradeSummary(
        @Param('address') address: string,
        @Query() query: ExpressQuery
        ) {
        console.log(`tradeSummary :`, address, query)
        try {
            return await this.eventService.tradeSummary(address, query)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/minted')
    @ApiOperation({ summary: 'Create a minted event' })
    @ApiBody({ type: EventDto })
    async postMinted(@Body() body: EventDto) {
        try {
            return await this.eventService.createEvent(body)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/transfer')
    @ApiOperation({ summary: 'Create a transfer event' })
    @ApiBody({ type: EventDto })
    async postTransfer(@Body() body: EventDto) {
        try {
            return await this.eventService.createEvent(body)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
