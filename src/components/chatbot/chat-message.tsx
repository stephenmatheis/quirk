import { useEffect, useState } from 'react';
import { ChatBotHistoryItem, ChatBotMessageType } from './types';
import styles from './chat-message.module.scss';

interface ChatMessageProps {
    message: ChatBotHistoryItem;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const [content, setContent] = useState('');

    useEffect(() => {
        if (message.content) {
            setContent(message.content);
        } else if (message.tokens?.length) {
            let output = '';
            let currentSequence = -1;

            for (const token of message.tokens) {
                if (token.sequenceNumber === currentSequence + 1) {
                    currentSequence = token.sequenceNumber;
                    output += token.value;
                } else {
                    break;
                }
            }
            setContent(output);
        }
    }, [message]);

    const isLoading =
        message.type === ChatBotMessageType.AI &&
        (!message.content || message.content.trim().length === 0) &&
        !message.tokens?.length;

    return (
        <div
            className={`${styles.chatMessage} ${message.type === ChatBotMessageType.Human ? styles.human : styles.ai}`}
        >
            <div className={styles.messageBubble}>
                {content.trim()}
                {isLoading && <span className={styles.blinkingCursor}>█</span>}
            </div>
        </div>
    );
}
