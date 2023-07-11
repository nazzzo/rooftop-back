import { Module } from '@nestjs/common';
import { AirdropController } from './airdrop.controller';
import { AirdropService } from './airdrop.service';
import { MongooseModule } from '@nestjs/mongoose'
import { AirdropSchema } from './schemas/airdrop.schema'


@Module({
  imports: [MongooseModule.forFeature([{name: 'Airdrop', schema: AirdropSchema}])],
  controllers: [AirdropController],
  providers: [AirdropService]
})
export class AirdropModule {}
