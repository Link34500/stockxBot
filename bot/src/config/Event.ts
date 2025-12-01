import type { ClientEvents } from "discord.js";

export interface EventManager<T extends keyof ClientEvents> {
  name: T;
  execute: (...args: ClientEvents[T]) => void | Promise<void>;
}

export default abstract class Event<T extends keyof ClientEvents>
  implements EventManager<T>
{
  abstract name: T;
  async execute(...args: ClientEvents[T]): Promise<void> {}
}
