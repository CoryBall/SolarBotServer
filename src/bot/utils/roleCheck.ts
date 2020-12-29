import {GuildMemberRoleManager, Role} from "discord.js";
import {Command} from "../types";


export function roleCheck(command: Command, roles: GuildMemberRoleManager | undefined): boolean {
  if (!command.roleNeeded) return true;
  const memberRoles = roles?.cache.map((role: Role) => {
    return role.name
  })

  return memberRoles?.includes(command.roleNeeded) ?? false
}