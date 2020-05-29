import { Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema } from '@/invitation/invitation.schema';

@Module({
  controllers: [InvitationController],
  providers: [InvitationService],
  imports: [
    MongooseModule.forFeature([{ name: Invitation.name, schema: InvitationSchema }])
  ]
})
export class InvitationModule {}
