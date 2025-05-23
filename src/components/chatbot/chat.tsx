import { useState } from 'react';
import { ChatBotHistoryItem } from './types';
import ChatMessage from './chat-message';
import { ChatInputPanel } from './chat-input-panel';
import styles from './chat.module.scss';

export default function Chat() {
    const [running, setRunning] = useState<boolean>(false);
    const [messageHistory, setMessageHistory] = useState<ChatBotHistoryItem[]>([]);

    return (
        <div className="full-page">
            <div className={styles.chat}>
                {messageHistory.map((message, idx) => {
                    return <ChatMessage key={idx} message={message} />;
                })}
                <h1 className={styles.greeting}>
                    {messageHistory.length == 0 && (
                        <>
                            <div className={styles.dark}>Hello there.</div>
                            {/* <div className={styles.light}>How can I help?</div> */}
                        </>
                    )}
                </h1>
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
