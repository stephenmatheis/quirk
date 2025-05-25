import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ChatBotHistoryItem } from '@/types/types';
import styles from './chat-input-panel.module.scss';
import classNames from 'classnames';

type ChatInputPanelProps = {
    running: boolean;
    setRunning: Dispatch<SetStateAction<boolean>>;
    messageHistory: ChatBotHistoryItem[];
    setMessageHistory: Dispatch<SetStateAction<ChatBotHistoryItem[]>>;
};

const MAX_ROWS = 12;

export function ChatInputPanel({ running, setRunning, messageHistory, setMessageHistory }: ChatInputPanelProps) {
    const [prompt, setPrompt] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;

        if (!textarea) return;

        const lineHeight = 21;
        const maxHeight = lineHeight * MAX_ROWS;

        function resize() {
            if (!textarea) return;

            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
        }

        textarea.addEventListener('input', resize);

        resize();

        return () => textarea.removeEventListener('input', resize);
    }, []);

    async function handleSendMessage() {
        if (running || !prompt.trim()) return;

        setMessageHistory((prev) => [
            ...prev,
            {
                type: 'human',
                content: prompt,
            },
        ]);

        setPrompt('');
        setRunning(true);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        setRunning(false);
    }

    return (
        <div className={classNames(styles['chat-input-panel'], { [styles['bottom']]: messageHistory.length > 0 })}>
            <span className={styles.prompt}>{'>'}</span>
            <textarea
                ref={textareaRef}
                className={styles['chat-input']}
                rows={1}
                data-locator="prompt-input"
                value={prompt}
                autoFocus={true}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
            />
        </div>
    );
}
