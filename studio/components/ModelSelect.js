import React from "react";
import {withDocument} from "part:@sanity/form-builder";
import {FormField} from "@sanity/base/components";
import {Select} from "@sanity/ui";
import PatchEvent, {set, unset} from "@sanity/form-builder/PatchEvent";
import {useId} from "@reach/auto-id";

import {models} from "../dataTypes";

const ModelSelect = React.forwardRef((props, ref) => {
  const {
    type,
    value,
    readOnly,
    placeholder,
    markers,
    presence,
    compareValue,
    onFocus,
    onBlur,
    onChange,
    document,
  } = props;

  const make = document.make?.toLowerCase();

  const handleChange = React.useCallback(
    (event) => {
      const inputValue = event.currentTarget.value;
      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()));
    },
    [onChange],
  );

  const inputId = useId();

  return (
    <FormField
      description={type.description}
      title={type.title}
      compareValue={compareValue}
      __unstable_markers={markers}
      __unstable_presence={presence}
      inputId={inputId}
    >
      <Select
        id={inputId}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
      >
        <option value="-1"></option>
        {(models[make] || []).map(({title, value}) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </Select>
    </FormField>
  );
});

export default withDocument(ModelSelect);
