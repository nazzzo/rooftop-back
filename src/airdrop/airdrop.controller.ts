import { Body, Controller, Delete, Query, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { AirdropService } from './airdrop.service';
import { AirdropDto } from "./dto/airdrop.dto";
import { Airdrop } from "./schemas/airdrop.schema";
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

@Controller('airdrop')
@ApiTags('airdrop') // 태그 추가
export class AirdropController {
    constructor(private airdropService: AirdropService) {}

    @Get('')
    @ApiOperation({ summary: 'Get all information of airdrops' }) // 요청의 설명 추가
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' }) // 쿼리 파라미터 추가
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns all airdrops' })
    async getAirdrops(@Query() query: ExpressQuery): Promise<Airdrop[]> {
        try {
            return await this.airdropService.findAll(query)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':address')
    @ApiOperation({ summary: 'Get airdrop information by address' })
    @ApiParam({ name: 'address', type: String, description: 'User address' }) // 경로 파라미터 추가
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns the airdrop' })
    async getAirdrop(@Param('address') address: string) {
        try {
            console.log(address)
            return await this.airdropService.find(address)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('/create')
    @ApiOperation({ summary: 'Create airdrop event' })
    @ApiBody({ type: AirdropDto }) // 요청 바디의 스키마 추가
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Returns the created airdrop' })
    async postAirdrop(@Body() airdropDto: AirdropDto): Promise<Airdrop> {
        try {
            return await this.airdropService.create(airdropDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }

    @Post('/checkDuplicate')
    @ApiOperation({ summary: 'Check if airdrop event already exists' })
    @ApiBody({ type: AirdropDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns the found airdrop if it exists' })
    async postCheckDuplicate(@Body() body) {
        try {
            return await this.airdropService.findOne(body);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/update')
    @ApiOperation({ summary: 'add applicant for current airdrop event' })
    @ApiBody({ type: AirdropDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns the updated airdrop info' })
    async putAirdrop(@Body() updateProps): Promise<Airdrop> {
        try {
            return await this.airdropService.update(updateProps)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }

    @Delete(':address')
    @ApiOperation({ summary: 'Delete ended airdrop event' })
    @ApiParam({ name: 'address', type: String, description: 'User address' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns a success message' })
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
