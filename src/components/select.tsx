import * as select from "@zag-js/select";
import { useMachine, normalizeProps, Portal } from "@zag-js/react";
import { useId } from "react";
import { css } from "../../styled-system/css";
import {
  RiArrowDownLine,
  RiArrowDownSLine,
  RiArrowDownWideLine,
} from "@remixicon/react";
import { hstack } from "../../styled-system/patterns";

const selectData = [
  { label: "Nigeria", value: "NG" },
  { label: "Japan", value: "JP" },
  { label: "Korea", value: "KO" },
  { label: "Kenya", value: "KE" },
  { label: "United Kingdom", value: "UK" },
  { label: "Ghana", value: "GH" },
  { label: "Uganda", value: "UG" },
];

export function Select() {
  const collection = select.collection({
    items: selectData,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  const [state, send] = useMachine(
    select.machine({
      id: useId(),
      collection,
      positioning: {
        offset: {
          mainAxis: 0,
        },
      },
    }),
  );

  const api = select.connect(state, send, normalizeProps);

  return (
    <div {...api.getRootProps()} className={css({ display: "inline-block" })}>
      <div {...api.getControlProps()}>
        {/*<label {...api.getLabelProps()}>Label</label>*/}
        <button
          {...api.getTriggerProps()}
          className={hstack({
            backgroundColor: "gray.a.3",
            px: "2",
            py: "1",
            borderRadius: "sm",
          })}
        >
          <span>{api.valueAsString || "Select option"}</span>
          <RiArrowDownSLine size={16} />
        </button>
      </div>

      <Portal>
        <div {...api.getPositionerProps()}>
          <ul
            {...api.getContentProps()}
            className={css({
              backgroundColor: "gray.3",
              borderRadius: "sm",
              overflow: "hidden",
              minWidth: "200px",
            })}
          >
            {selectData.map((item) => (
              <li
                key={item.value}
                {...api.getItemProps({ item })}
                className={hstack({
                  justifyContent: "space-between",
                  p: "2",
                  _hover: {
                    backgroundColor: "yellow.3",
                    color: "yellow.12",
                  },
                  '&[data-state="checked"]': {
                    fontWeight: "bold",
                    color: "token(colors.yellow.11) !important",
                  },
                })}
              >
                <span>{item.label}</span>
                <span {...api.getItemIndicatorProps({ item })}>✓</span>
              </li>
            ))}
          </ul>
        </div>
      </Portal>
    </div>
  );
}
