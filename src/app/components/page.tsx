import { css } from "@styled-system/css";
import { TextField } from "@/components/TextField";
import { NumberField } from "@/components/NumberField";
import { SelectField } from "@/components/SelectField";

export default function ComponentsPage() {
  return (
    <div className={css({ p: "xl" })}>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "2xl",
        })}
      >
        <TextField label={"First name"} placeholder={"John Doe"} />
        <TextField
          isInvalid={true}
          label={"First name"}
          placeholder={"John Doe"}
          errorMessage={"Cannot be empty"}
        />
        <NumberField label={"Age"} placeholder={"42"} />
        <SelectField
          label={"Favorite color"}
          items={[{ id: "1", value: { text: "Green" } }]}
          // isInvalid={true}
          // errorMessage={"Cannot be empty"}
        />
      </div>
    </div>
  );
}
