import {
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { bot } from "@/index";

interface Option {
  label: string;
  value: string;
}

interface SelectMenuProps {
  placeholder: string;
  opts: Option[];
}

import Component, { DefaultComponentProps } from "@/config/Component";

export default class SelectMenu extends Component<
  StringSelectMenuInteraction,
  StringSelectMenuBuilder
> {
  constructor({
    placeholder,
    opts,
    userId: user,
    callback,
    onError,
  }: SelectMenuProps & DefaultComponentProps<StringSelectMenuInteraction>) {
    super({ callback, onError, userId: user }, bot.selectMenus);

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId(this.customId)
      .setPlaceholder(placeholder)
      .setOptions(opts);
    this.addComponents(selectMenu);
    bot.selectMenus.set(this.customId, this);
  }
}
