import { Dispatch, SetStateAction, useState } from 'react';
import { ChatBotHistoryItem } from '@/types/types';
import styles from './chat-input-panel.module.scss';

type ChatInputPanelProps = {
    running: boolean;
    setRunning: Dispatch<SetStateAction<boolean>>;
    setMessageHistory: Dispatch<SetStateAction<ChatBotHistoryItem[]>>;
};

export function ChatInputPanel({ running, setRunning, setMessageHistory }: ChatInputPanelProps) {
    const [prompt, setPrompt] = useState<string>('');

    async function handleSendMessage() {
        if (running || !prompt.trim()) return;

        setPrompt('');
        setRunning(true);

        // Simulate sending a message
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setRunning(false);

        setMessageHistory((prev) => [
            ...prev,
            {
                type: 'human',
                content: prompt,
            },
        ]);
    }

    return (
        <div className={styles['chat-input-panel']}>
            <span>{'>'}</span>
            <textarea
                className={styles['chat-input']}
                rows={1}
                data-locator="prompt-input"
                value={prompt}
                autoFocus={true}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyUp={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
            />
        </div>
    );
}
