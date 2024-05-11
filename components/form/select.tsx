import React, { ChangeEvent, FormEvent } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  containerClassName?: string;
  selectClassName: string;
  onClick?: (e: FormEvent<HTMLSelectElement>) => void;
}

export default function SelectForm({
  children,
  onClick,
  containerClassName,
  selectClassName,
  title,
}: Props) {
  return (
    <div className={containerClassName}>
      <label>{title}</label>
      <select onClick={onClick} className={selectClassName}>
        {children}
      </select>
    </div>
  );
}
