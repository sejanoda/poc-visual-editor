"use client"
import React from 'react';
import { useEditor } from '@/app/context/EditorProvider';

export default function HeaderEditor() {
    const { setEditonMode, isEditionMode, changes, draftChanges } = useEditor();
    return (
        <div className={`flex ${isEditionMode ? 'justify-between' : 'justify-end'} p-4`}>
            {isEditionMode && <div className='flex gap-2'>
                <button
                    className={`relative text-white w-12 h-12 rounded-lg ${draftChanges.length ? "bg-green-500" : "bg-gray-500 "}`}
                    onClick={() => { }}>
                    <span>
                        D
                    </span>
                    {draftChanges.length > 0 &&
                        <span className='absolute -bottom-1 -right-1 px-1 text-[10px] rounded bg-rose-500'>
                            {draftChanges.length > 99 ? `${draftChanges.length}+` : draftChanges.length}
                        </span>
                    }
                </button>
                <button
                    className={`relative text-white w-12 h-12 rounded-lg ${changes.length ? "bg-blue-500" : "bg-gray-500 "}`}
                    onClick={() => { }}>
                    <span>
                        P
                    </span>
                    {changes.length > 0 && <span className='absolute -bottom-1 -right-1 px-1 text-[10px] rounded bg-rose-500'>
                        {changes.length > 99 ? `${changes.length}+` : changes.length}
                    </span>
                    }
                </button>
            </div>}
            <button
                className={`text-white w-12 h-12 rounded-lg ${isEditionMode ? "bg-rose-500" : "bg-gray-500 "}`}
                onClick={() => setEditonMode(!isEditionMode)}>
                {isEditionMode ? 'X' : 'E'}
            </button>
        </div>
    );
}
