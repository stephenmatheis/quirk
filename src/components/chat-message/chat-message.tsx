import { ChatBotHistoryItem } from '@/types/types';
import styles from './chat-message.module.scss';

type ChatMessageProps = {
    message: ChatBotHistoryItem;
};

export function ChatMessage({ message }: ChatMessageProps) {
    return (
        <div className={`${styles.chatMessage} ${message.type === 'human' ? styles.human : styles.ai}`}>
            <div className={styles.messageBubble}>{message.content.trim()}</div>
        </div>
    );
}
