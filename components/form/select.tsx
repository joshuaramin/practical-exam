import React, { ChangeEvent, FormEvent } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  containerClassName?: string;
  selectClassName: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectForm({
  children,
  onChange,
  containerClassName,
  selectClassName,
  title,
}: Props) {
  return (
    <div className={containerClassName}>
      <label>{title}</label>
      <select onChange={onChange} className={selectClassName}>
        {children}
      </select>
    </div>
  );
}
