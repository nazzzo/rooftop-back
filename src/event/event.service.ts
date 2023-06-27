import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Event } from './schemas/event.schema';
import { EventDto } from './dto/event.dto';


@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name)
        private eventModel: mongoose.Model<Event>,
        private configService: ConfigService
    ) {}
    
    async findById(id) {
        try {
            const events = await this.eventModel.find({ id });
            if (!events) {
                throw new NotFoundException('대상을 찾지 못했습니다')
            }
            return events
        } catch (e) {
            throw new Error(e)
        }
    }

    async createEvent(event: EventDto) {
        try {
            console.log(event)
            const addEvent = await this.eventModel.create({
                ...event
            })
            console.log(addEvent)
            return addEvent
        } catch (e) {
            throw new Error(e)
        }
    }
}
