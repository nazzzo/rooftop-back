import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Event } from './schemas/event.schema';
import { EventDto } from './dto/event.dto';
import { FilterQuery } from 'mongoose';

interface Query {
    time?: number;
    event?: string;
    from?: string;
}

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name)
        private eventModel: mongoose.Model<Event>,
        private configService: ConfigService
    ) { }

    async findAll(query: Query) {
        console.log(query);
        try {
            const findOptions: FilterQuery<Event> = {};
            if (query.time && query.event) {
                const currentTime = new Date();
                const timeAgo = new Date(currentTime.getTime() - query.time * 60 * 60 * 1000);

                findOptions.createdAt = {
                    $gte: timeAgo,
                    $lte: currentTime
                };
                findOptions.event = query.event;
            } else if (query.from) {
                findOptions.from = query.from;
            }

            const events = await this.eventModel.find(findOptions).exec();
            if (!events || events.length === 0) {
                throw new NotFoundException('Event not found');
            }
            return events;
        } catch (e) {
            throw new Error(e);
        }
    }



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
