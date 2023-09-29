import React from "react";
import styles from "./UiSelect.module.css";

type Props = {
  options: Array<string>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  optionName: string;
};

const UiSelect: React.FC<Props> = ({ options, onChange, optionName }) => {
  return (
    <select className={styles.UiSelect} onChange={onChange}>
      <option value="">{optionName}</option>
      {options.map((currency) => (
        <option key={currency}>{currency}</option>
      ))}
    </select>
  );
};

export default UiSelect;
