'use client'

import React from 'react';
import { cn } from '@/lib/utils';

interface TerminalSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  user?: string;
  host?: string;
  dir?: string;
}

export function TerminalSearchInput({
  value,
  onChange,
  onFocus,
  onKeyDown,
  placeholder = "sudo rm -rf css/",
  className,
  disabled = false,
  autoFocus = false,
  user = "user",
  host = "exobengal",
  dir = "~",
}: TerminalSearchInputProps) {
  return (
    <div className={cn(
      "flex items-center bg-slate-900 dark:bg-slate-950 px-4 py-3 gap-2 rounded-lg border border-slate-700 dark:border-slate-600 transition-all duration-300",
      "hover:border-slate-600 dark:hover:border-slate-500",
      "focus-within:border-primary-light-blue/50 focus-within:ring-2 focus-within:ring-primary-light-blue/20",
      className
    )}>
      {/* Terminal Prompt */}
      <div className="flex items-center gap-0 text-sm font-mono select-none">
        <span className="text-pink-400 font-medium">{user}</span>
        <span className="text-teal-400">@{host}</span>
        <span className="text-purple-400">:{dir}</span>
        <span className="text-white">$</span>
      </div>
      
      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={cn(
          "flex-1 bg-transparent border-none outline-none text-white font-mono text-sm",
          "placeholder:text-slate-400 dark:placeholder:text-slate-500",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      />
    </div>
  );
}

export default TerminalSearchInput;
