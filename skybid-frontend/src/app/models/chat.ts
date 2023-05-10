export class Chat {
    chat: {
        _id: string;
        users: string[];
        messages: {
          sender: string;
          receiver: string;
          message: string;
          _id: string;
          createdAt: string;
          updatedAt: string;
        }[];
        createdAt: string;
        updatedAt: string;
      };
}