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
      "terminal-input-glass flex items-center px-4 py-3 gap-2 rounded-lg",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}>
      {/* Terminal Prompt */}
      <div className="flex items-center gap-0 text-sm font-mono select-none search-focus">
        <span className="text-pink-400 font-medium drop-shadow-sm">{user}</span>
        <span className="text-teal-400 drop-shadow-sm">@{host}</span>
        <span className="text-purple-400 drop-shadow-sm">:{dir}</span>
        <span className="text-white drop-shadow-sm">$</span>
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
          "placeholder:drop-shadow-sm text-shadow-sm",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      />
    </div>
  );
}

export default TerminalSearchInput;
