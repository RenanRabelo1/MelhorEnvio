import { InputHTMLAttributes } from "react";


interface InputProps {
  label: string;  
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
  
}


export const Input: React.FC<InputProps> = ({label, type = "text", placeholder, value, onChange}) => {
    return (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <input className="border border-gray-300 rounded-md p-1"
          type = {type}
          placeholder = {placeholder}
          value = {value}
          onChange = {onChange} />
        
        </div>
    )
  }
