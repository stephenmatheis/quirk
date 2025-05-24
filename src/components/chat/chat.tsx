import { useState } from 'react';
import { ChatMessage } from '@/components/chat-message';
import { ChatInputPanel } from '@/components/chat-input-panel';
import { ChatBotHistoryItem } from '@/types/types';
import styles from './chat.module.scss';

export function Chat() {
    const [running, setRunning] = useState<boolean>(false);
    const [messageHistory, setMessageHistory] = useState<ChatBotHistoryItem[]>([]);

    return (
        <div className="full-page">
            <div className={styles.chat}>
                <h1 className={styles.greeting}>
                    {messageHistory.length == 0 ? (
                        <div className={styles.dark}>Hello there.</div>
                    ) : (
                        messageHistory.map((message, idx) => {
                            return <ChatMessage key={idx} message={message} />;
                        })
                    )}
                </h1>
                <ChatInputPanel running={running} setRunning={setRunning} setMessageHistory={setMessageHistory} />
            </div>
        </div>
    );
}
