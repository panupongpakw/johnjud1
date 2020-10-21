import { Repository, EntityRepository } from 'typeorm';
import { Conversation } from './conversation.entity';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { FilterConversation } from '../dto/filter-conversation.dto';
import { Userinfo } from '../User_info/Userinfo.entity';
import { UnauthorizedException } from '@nestjs/common';
import { MarkAsReadConversationDto } from '../dto/markAsRead.dto';

@EntityRepository(Conversation)
export class ConversationRepository extends Repository<Conversation> {
  async getConversation(
    senderId: number,
    receiverId: number,
    filter: FilterConversation,
  ): Promise<Conversation[]> {
    const query = this.createQueryBuilder('conversations');

    if (receiverId !== null) {
      query
        .andWhere('(senderId=:senderId and receiverId=:receiverId)', {
          senderId,
          receiverId,
        })
        .orWhere('(senderId=:receiverId and receiverId=:senderId)', {
          receiverId,
          senderId,
        });
    } else {
      query.andWhere('senderId=:senderId or receiverId=:senderId', {
        senderId,
      });
    }

    if (filter.after) {
      query.andWhere('createdAt > :after', { after: filter.after });
    }

    if (filter.before) {
      query.andWhere('createdAt < :after', { before: filter.before });
    }
    if (filter.page) {
      if (filter.limit) {
        query.skip(filter.limit * (filter.page - 1));
      } else {
        query.skip(15 * (filter.page - 1));
      }
    }
    if (filter.limit) {
      query.limit(filter.limit);
    }

    return query.orderBy('createdAt', 'ASC').getMany();
  }

  async saveConversation(
    createConversationDTO: CreateConversationDto,
  ): Promise<Conversation> {
    const { senderId, receiverId, message } = createConversationDTO;
    const conversation = new Conversation();
    conversation.senderId = senderId;
    conversation.receiverId = receiverId;
    conversation.content = message;
    return this.save(conversation);
  }

  async markAllBeforeAsRead(conversation: MarkAsReadConversationDto) {
    const q = this.createQueryBuilder('conversations')
      .update({ readAt: new Date().toISOString() })
      .andWhere(
        '(senderId=:senderId and receiverId=:receiverId) or (senderId=:receiverId and receiverId=:senderId)',
        {
          senderId: conversation.senderId,
          receiverId: conversation.receiverId,
        },
      )
      .andWhere('createdAt <= :createdAt', {
        createdAt: new Date(conversation.createAt).toISOString(),
      })
      .andWhere('readAt IS NULL');
    const result = await q.execute();
    return result.raw.changedRows;
  }

//   async deleteConversation(conversationId: number, user: Userinfo) {
//     const query = this.createQueryBuilder('conversations');
//     const c: Conversation = await query
//       .andWhere('id=:id', {
//         id: conversationId,
//       })
//       .getOne();

//     if (c.senderId !== user.id && c.receiverId !== user.id) {
//       throw new UnauthorizedException(
//         'You are not able to delete this conversation',
//       );
//     }

//     return await this.remove(c);
//   }
}