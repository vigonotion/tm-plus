import { css } from "@styled-system/css";
import { TextField } from "@/components/TextField";
import { NumberField } from "@/components/NumberField";
import { SelectField } from "@/components/SelectField";
import { Button } from "@/components/Button";

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
          items={["Green", "Orange", "Blue"].map((x) => ({
            id: x,
            value: { text: x },
            textValue: x,
          }))}
          // isInvalid={true}
          // errorMessage={"Cannot be empty"}
        />
        <Button>Submit</Button>
      </div>
    </div>
  );
}
