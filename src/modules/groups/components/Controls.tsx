import React from "react";
import { Avatar, Checkbox, CustomSelectOption, FormItem, FormLayoutGroup, Select } from "@vkontakte/vkui";
import { FilterOptions } from "../types";

export interface IControlsProps {
  values: FilterOptions,
  onChange: (val: FilterOptions) => void
  colorOptions: string[]
}

const Controls = (props: IControlsProps) => {
  const privacyOptions = [
    {
      value: 'all',
      label: 'все'
    },
    {
      value: 'close',
      label: 'закрытые'
    },
    {
      value: 'open',
      label: 'открытые'
    }
  ]

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange({ ...props.values, color: e.target.value})
  }

  const handlePrivaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange({ ...props.values, privacy: e.target.value as FilterOptions["privacy"]})
  }

  const handleWithFriendsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({ ...props.values, withFriends: e.target.checked })
  }

  return (
    <>
      <FormLayoutGroup mode="horizontal">
        <FormItem
          top="Приватность"
          htmlFor="select-privacy"
        >
          <Select
            id="select-privacy"
            placeholder="все"
            options={privacyOptions}
            value={props.values.privacy}
            renderOption={({ option, ...restProps }) => (
              <CustomSelectOption {...restProps} key={option.value} />
            )}
            onChange={handlePrivaryChange}
          />
        </FormItem>

        <FormItem
          top="Цвет группы"
          htmlFor="select-color"
        >
          <Select
            id="select-privacy"
            placeholder="любой"
            options={props.colorOptions.map((option, i) => ({
              label: option,
              value: option
            }))}
            renderOption={({ option, ...restProps }) => (
              <CustomSelectOption
                {...restProps}
                key={option.value}
                before={<Avatar size={24} style={{ backgroundColor: option.label }} />}
              />
            )}
            allowClearButton
            value={props.values.color || undefined}
            onChange={handleColorChange}
          />
        </FormItem>
      </FormLayoutGroup>
      <FormItem>
        <Checkbox 
          description="Будут показаны только группы, в которых состоят ваши друзья"
          onChange={handleWithFriendsChange}
        >
          С друзьями
        </Checkbox>
      </FormItem>
    </>
  )
}

export default Controls;

