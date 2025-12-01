import { Bot } from "./Bot";
import Logger from "./Logger";
import { getCollection } from "./utils";
import path from "path";
import Event from "./Event";
import Command from "./Command";
import { bot } from "@/index";
import {
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
} from "discord.js";
import Modal from "@/components/Modal";

export default class Loader {
  logger = new Logger({ showDebug: false });
  constructor(public client: Bot) {
    this.init();
  }
  async init() {
    await this.loadEvents();
    await this.loadCommands();
    await this.loadModals();
  }

  private async loadCollection<T>(directory: string, collectionName: string) {
    this.logger.info(`Loading ${collectionName}...`);
    const collection = await getCollection<T>(
      path.join(globalThis.__dirname, directory)
    );
    this.logger.info(`${collectionName} Loaded`);
    return collection;
  }

  async loadEvents() {
    (await this.loadCollection<Event<any>>("events", "Events")).mapValues(
      (event) => {
        this.client.on(event.name, event.execute);
      }
    );
  }
  async loadCommands() {
    this.client.commands = await this.loadCollection<Command>(
      "commands",
      "Commands"
    );
  }
  async loadModals() {
    this.client.modals = await this.loadCollection<Modal>("ui", "Modals");
  }
  async onCommand(interaction: ChatInputCommandInteraction) {
    const command = bot.commands?.get(interaction.commandName);
    await command?.execute(interaction);
  }

  async onModalSubmit(interaction: ModalSubmitInteraction) {
    const modal = bot.modals?.get(interaction.customId);
    await modal?.callback(interaction);
  }
}
