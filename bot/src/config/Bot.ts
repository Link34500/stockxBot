import { Client } from "discord.js";
import config from "@/config";
import Loader from "./Loader";
import { Collection } from "discord.js";
import Logger from "./Logger";
import Command from "./Command";
import Modal from "@/components/Modal";
import SelectMenu from "@/components/SelectMenu";
import Button from "@/components/Button";

const logger = new Logger({ prefix: "StockXBot", showDebug: false });

export class Bot extends Client {
  commands = new Collection<string, Command>();
  modals = new Collection<string, Modal>();
  selectMenus = new Map<string, SelectMenu>();
  buttons = new Map<string, Button>();
  loader: Loader;
  constructor() {
    super({ intents: config.intents });
    this.loader = new Loader(this);
  }

  async run() {
    this.login(config.token);
  }
}
