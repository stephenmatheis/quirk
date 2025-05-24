import { Dispatch, DragEvent, SetStateAction, useRef, useState } from 'react';
import classNames from 'classnames';
import { ChatBotHistoryItem } from '@/types/types';
import styles from './chat-input-panel.module.scss';

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

type ChatInputPanelProps = {
    running: boolean;
    setRunning: Dispatch<SetStateAction<boolean>>;
    setMessageHistory: Dispatch<SetStateAction<ChatBotHistoryItem[]>>;
};

export function ChatInputPanel({ running, setRunning, setMessageHistory }: ChatInputPanelProps) {
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
        <>
            <div className={styles['chat-input-panel']}>
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
                                        width="33"
                                        height="32"
                                        viewBox="0 0 33 32"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M24.4701 14.475H22.9401V25.145H24.4701V14.475Z" />
                                        <path d="M22.94 25.145H21.42V26.675H22.94V25.145Z" />
                                        <path d="M21.4201 26.675H19.9001V28.195H21.4201V26.675Z" />
                                        <path d="M21.4201 5.33496H19.9001V22.095H21.4201V5.33496Z" />
                                        <path d="M19.9001 22.095H18.3701V23.625H19.9001V22.095Z" />
                                        <path d="M19.9001 3.815H18.3701V5.335H19.9001V3.815Z" />
                                        <path d="M19.9 28.1949H13.8V29.7149H19.9V28.1949Z" />
                                        <path d="M18.3701 23.625H16.8501V25.145H18.3701V23.625Z" />
                                        <path d="M16.8501 22.095H15.3201V23.625H16.8501V22.095Z" />
                                        <path d="M15.32 9.90497H13.8V22.095H15.32V9.90497Z" />
                                        <path d="M18.3702 2.28497H12.2802V3.81497H18.3702V2.28497Z" />
                                        <path d="M13.8002 26.675H12.2802V28.195H13.8002V26.675Z" />
                                        <path d="M12.2801 25.145H10.7501V26.675H12.2801V25.145Z" />
                                        <path d="M12.2801 3.815H10.7501V5.335H12.2801V3.815Z" />
                                        <path d="M10.7501 5.33496H9.2301V25.145H10.7501V5.33496Z" />
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
                            <span>{'\u2191'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
