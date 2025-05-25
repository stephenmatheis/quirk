import { useEffect, useState } from 'react';
import { ChatMessage } from '@/components/chat-message';
import { ChatInputPanel } from '@/components/chat-input-panel';
import { ChatBotHistoryItem } from '@/types/types';
import styles from './chat.module.scss';

export function Chat() {
    const [running, setRunning] = useState<boolean>(false);
    const [messageHistory, setMessageHistory] = useState<ChatBotHistoryItem[]>([]);

    useEffect(() => {
        // setRunning(true);

        // const mockMessages: ChatBotHistoryItem[] = [
        //     { type: 'ai', content: 'Hello, User.' },
        //     { type: 'human', content: 'Hey, System.' },
        //     { type: 'ai', content: 'How can I assist you today?' },
        // ];

        // setMessageHistory(mockMessages);

        // setRunning(false);
    }, []);

    return (
        <div className="full-page">
            <div className={styles.chat}>
                {messageHistory.length == 0 ? (
                    <h1 className={styles.greeting}>
                        <div className={styles.dark}>Hello there.</div>
                    </h1>
                ) : (
                    <div className={styles.messages}>
                        {messageHistory.map((message, idx) => {
                            return <ChatMessage key={idx} message={message} />;
                        })}
                    </div>
                )}
                <ChatInputPanel
                    running={running}
                    setRunning={setRunning}
                    messageHistory={messageHistory}
                    setMessageHistory={setMessageHistory}
                />
            </div>
        </div>
    );
}
