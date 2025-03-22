import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input(props: InputProps) {

  return (
    <input 
      className="max-w-2xl border-0 w-full px-2 text-black bg-white h-10 outline-none rounded-sm"
      {...props}
    />
  )
}