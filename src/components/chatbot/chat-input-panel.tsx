import { Dispatch, DragEvent, SetStateAction, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './chat.module.scss';
import { ChatBotHistoryItem } from './types';

const fileExtensions = new Set([
    '.csv',
    '.doc',
    '.docx',
    '.epub',
    '.odt',
    '.pdf',
    '.ppt',
    '.pptx',
    '.tsv',
    '.xlsx',
    '.eml',
    '.html',
    '.json',
    '.md',
    '.msg',
    '.rst',
    '.rtf',
    '.txt',
    '.xml',
]);

type ReceiveMessagesPayload = {
    value: {
        data: {
            receiveMessages: {
                sessionId: string;
                data: string;
            };
        };
    };
};

type ChatInputPanelProps = {
    running: boolean;
    setRunning: Dispatch<SetStateAction<boolean>>;
    messageHistory: ChatBotHistoryItem[];
    setMessageHistory: Dispatch<SetStateAction<ChatBotHistoryItem[]>>;
};

export function ChatInputPanel({ running, setRunning, messageHistory, setMessageHistory }: ChatInputPanelProps) {
    const [prompt, setPrompt] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    // const [dragActive, setDragActive] = useState(false);
    // const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
    // const [fileErrors, setFileErrors] = useState<string[]>([]);
    // const [fileStatusMap, setFileStatusMap] = useState<Record<string, 'queued' | 'uploading' | 'done' | 'error'>>({});

    function onSetFiles(files: File[]) {
        const errors: string[] = [];
        const validFiles: File[] = [];

        for (const file of files) {
            const ext = file.name.split('.').pop()?.toLowerCase();
            const reason = file.name.includes(',')
                ? 'File name cannot contain a comma'
                : !fileExtensions.has(`.${ext}`)
                ? 'Format not supported'
                : file.size > 100 * 1000 * 1000
                ? 'File size too large (max 100MB)'
                : null;

            if (reason) errors.push(`${file.name}: ${reason}`);
            else validFiles.push(file);
        }

        // setFileErrors(errors);
        // setFilesToUpload(validFiles);
        // setFileStatusMap(() => {
        //     const status: Record<string, 'queued'> = {};

        //     validFiles.forEach((file) => (status[file.name] = 'queued'));

        //     return status;
        // });
    }

    function handleDrag(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        // setDragActive(e.type === 'dragenter' || e.type === 'dragover');
    }

    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        // setDragActive(false);
        if (e.dataTransfer.files?.length) onSetFiles([...e.dataTransfer.files]);
    }

    async function handleSendMessage() {
        if (running || !prompt.trim()) return;

        setPrompt('');
    }

    return (
        <>
            <div className={styles['chat-prompt-container']}>
                {/* Field */}
                <div className={styles['chat-prompt-field']}>
                    {/* Textarea */}
                    <textarea
                        rows={1}
                        data-locator="prompt-input"
                        value={prompt}
                        placeholder={'Ask me anything'}
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

                {/* Toolbar */}
                <div className={styles['chat-prompt-actions']}>
                    {/* Left */}
                    <div className={styles.box}>
                        {/* DEV: */}

                        <div className={styles['drag-and-drop-ctr']}>
                            <div
                                className={styles['action-button']}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => inputRef.current?.click()}
                            >
                                {/* Paperclip icon */}
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
                                    </svg>
                                </span>

                                {/* Hidden input */}
                                <input
                                    ref={inputRef}
                                    type="file"
                                    multiple
                                    className={styles.input}
                                    onChange={(e) => onSetFiles([...e.target.files!])}
                                />
                            </div>
                        </div>

                        {/* DEV: */}
                    </div>

                    {/* Right */}
                    <div className={styles.box}>
                        {/* Send message */}
                        <button
                            className={classNames(styles['answer-button'], {
                                [styles.ready]: prompt,
                            })}
                            onClick={handleSendMessage}
                        >
                            <span>
                                <svg
                                    className={styles.send}
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Example prompts */}
            <div className={styles.examples}>
                {['Create a list', 'Summarize tasks', 'Teach me', 'Organize notes'].map((example) => (
                    <button key={example} className={styles.example} onClick={() => setPrompt(example)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5"
                            />
                        </svg>
                        <span>{example}</span>
                    </button>
                ))}
            </div>
        </>
    );
}
