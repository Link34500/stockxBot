import { REST, Routes } from "discord.js";
import path from "path";
import { getCollection } from "./config/utils.js";
import config from "./config.js";
import Command from "./config/Command.js";

const rest = new REST().setToken(config.token);

(async () => {
  const collectionCommands = await getCollection<Command>(
    path.join(import.meta.dirname, "commands")
  );
  const commands = collectionCommands.map((value) => value.data.toJSON());
  try {
    console.log(`Mise à jour de ${commands.length} commandes (/)`);
    const data: any = await rest.put(
      Routes.applicationGuildCommands(config.client_id, config.guild),
      { body: commands }
    );
    console.log(`Mise à jour réussite de ${data.length} commandes (/)`);
  } catch (error) {
    console.log(error);
  }
})();
