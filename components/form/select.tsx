import React, { ChangeEvent, FormEvent } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/themes";
interface Props {
  title: string;
  containerClassName?: string;
  selectClassName: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectForm({
  onChange,
  containerClassName,
  selectClassName,
  title,
}: Props) {
  return (
    <div className={containerClassName}>
      <h2>Label</h2>
      <Select.Root defaultValue="apple">
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            <Select.Item value="orange">Orange</Select.Item>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="grape" disabled>
              Grape
            </Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Vegetables</Select.Label>
            <Select.Item value="carrot">Carrot</Select.Item>
            <Select.Item value="potato">Potato</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
