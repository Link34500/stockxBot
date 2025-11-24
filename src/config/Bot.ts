import { Client } from "discord.js";
import config from "@/config";
import Loader from "./Loader";
import type { Collection } from "discord.js";
import Logger from "./Logger";
import Command from "./Command";
import Modal from "./Modal";

const logger = new Logger({ prefix: "StockXBot", showDebug: false });

export class Bot extends Client {
  commands: Collection<string, Command> | undefined;
  modals: Collection<string, Modal> | undefined;
  loader: Loader;
  constructor() {
    super({ intents: config.intents });
    this.loader = new Loader(this);
  }

  async run() {
    this.login(config.token);
  }
}
