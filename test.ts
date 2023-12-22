import { Account } from "src/account/entities/account.entities"

 class Account {
    id: string;
    
    user: User; // ref User 

    conversation: Conversation[] // ref

    participation: Participants[]



}

class Participants {
    id: string

    account: Account

    conversation: Conversation[]
}
  

class Conversation {
    id: string,

    creator: Account
    
    participants: Participants // ref Account
    
    messagesHistory: string
}

class Direct {
    id: string,

    participant: Participants

    messagesHistory: string
}