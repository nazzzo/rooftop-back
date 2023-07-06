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
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const events = await this.eventModel.find({ id });
            if (!events) {
                throw new NotFoundException('대상을 찾지 못했습니다')
            }
            return events
        } catch (error) {
            throw error;
        }
    }

    async tradeSummary(NFTaddress, query) {
        try {
            if (!query.time) return null
            const currentTime = new Date();
            const timeAgo = new Date(currentTime.getTime() - query.time * 60 * 60 * 1000);
            const prevTimeAgo = new Date(currentTime.getTime() - query.time * 2 * 60 * 60 * 1000);

            const currentEvents = await this.eventModel.find({ NFTaddress, createdAt: { $gte: timeAgo, $lte: currentTime } }).exec();
            const prevEvents = await this.eventModel.find({ NFTaddress, createdAt: { $gte: prevTimeAgo, $lte: timeAgo } }).exec();

            if (!currentEvents || !prevEvents) {
                throw new NotFoundException('Event not found');
            }

            // 거래 총량
            const currentVolume = currentEvents.reduce((sum, event) => sum + Number(event.krwPrice), 0);
            const prevVolume = prevEvents.reduce((sum, event) => sum + Number(event.krwPrice), 0);

            // 증감비
            let percentage
            if (!prevVolume) {
                percentage = currentVolume * 100
            } else {
                percentage = (((currentVolume - prevVolume) / prevVolume) * 100)
            }

            const result = {
                currentTradeVolume: currentVolume.toFixed(2),
                previousTradeVolume: prevVolume.toFixed(2),
                percentage: percentage.toFixed(0),
            };
            
            if(result.percentage === undefined) return null

            return result;
        } catch (error) {
            throw error;
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
        } catch (error) {
            throw error;
        }
    }
}
