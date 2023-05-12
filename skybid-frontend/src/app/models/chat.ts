export class Chat {
    chat: {
        _id: string;
        users: [];
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