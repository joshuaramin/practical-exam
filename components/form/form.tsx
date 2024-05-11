import React, { FormEvent } from "react";

interface Form {
  onSubmit: (e: FormEvent) => Promise<any>;
  className: string;
  children: React.ReactNode;
}

export default function Form({ onSubmit, className, children }: Form) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
