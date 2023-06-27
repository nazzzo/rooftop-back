import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';

@Controller('event')
export class EventController {
    constructor(private eventService: EventService) { }

    @Get(':id')
    async getActivity(@Param('id') id: number | string) {
        try {
            return await this.eventService.findById(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/minted')
    async postMinted(@Body() body: EventDto) {
        try {
            return await this.eventService.createEvent(body)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Post('/transfer')
    async postTransfer(@Body() body: EventDto) {
        try {
            return await this.eventService.createEvent(body)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
