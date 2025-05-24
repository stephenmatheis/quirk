import { ChatBotHistoryItem } from '@/types/types';
import styles from './chat-message.module.scss';

type ChatMessageProps = {
    message: ChatBotHistoryItem;
};

export function ChatMessage({ message }: ChatMessageProps) {
    const isLoading = message.type === 'ai' && (!message.content || message.content.trim().length === 0);

    return (
        <div className={`${styles.chatMessage} ${message.type === 'human' ? styles.human : styles.ai}`}>
            <div className={styles.messageBubble}>
                {message.content.trim()}
                {isLoading && <span className={styles.blinkingCursor}>█</span>}
            </div>
        </div>
    );
}
