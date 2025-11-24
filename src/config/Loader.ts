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
import Modal from "./Modal";

export default class Loader {
  logger = new Logger({ showDebug: false });
  constructor(public client: Bot) {
    this.init();
  }
  async init() {
    this.logger.info("Loading Events...");
    (await this.loadEvents()).mapValues((event) => {
      this.client.on(event.name, event.execute);
    });
    this.logger.info("Events Loaded");
    this.logger.info("Loading Commands...");
    this.client.commands = await this.loadCommands();
    this.logger.info("Commands Loaded");
    this.logger.info("Loading Modals...");
    this.client.modals = await this.loadModals();
    this.logger.info("Modals Loaded");
  }
  async loadEvents() {
    return await getCollection<Event<any>>(
      path.join(globalThis.__dirname, "events")
    );
  }
  async loadCommands() {
    return await getCollection<Command>(
      path.join(globalThis.__dirname, "commands")
    );
  }
  async loadModals() {
    return await getCollection<Modal>(path.join(globalThis.__dirname, "ui"));
  }

  async onModalSubmit(interaction: ModalSubmitInteraction) {
    const modal = bot.modals?.get(interaction.customId);
    await modal?.callback(interaction);
  }

  async onCommand(interaction: ChatInputCommandInteraction) {
    const command = bot.commands?.get(interaction.commandName);
    if (!command) {
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(
        "Erreur lors de l'exécution de",
        interaction.commandName,
        ":",
        error
      );

      if (interaction.replied) {
        await interaction.followUp({
          content: "Erreur lors de l'exécution de la commande",
        });
      } else if (interaction.deferred) {
        await interaction.editReply({
          content: "Erreur lors de l'exécution de la commande",
        });
      } else {
        await interaction.reply({
          content: "Erreur lors de l'exécution de la commande",
        });
      }
    }
  }
}
