import { getDiscordClient, setDiscordClient } from '../types'

export default async () => {
  const client = getDiscordClient()

  client.once('ready', () => {
    console.log('Discord.Js Initiated')
  })

  await client.login(process.env.DISCORD_BOT_TOKEN)

  setDiscordClient(client)
}
