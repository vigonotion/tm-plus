import { css } from "@styled-system/css";
import { vstack } from "@styled-system/patterns";
import { TextField } from "@/components/TextField";

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
      </div>
    </div>
  );
}
