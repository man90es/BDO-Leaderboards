export enum RegionEnum {
  EU = "EU",
  NA = "NA",
  SA = "SA",
}

function composeGuildLink(subdomain: string, locale: string, guildName: string, region: RegionEnum) {
    const query = new URLSearchParams({ guildName, region })

    return `https://www.${subdomain}.playblackdesert.com/${locale}/Adventure/Guild/GuildProfile?` + query
}

const supportedServers: Set<{
    colour: string
    domain: RegionEnum
    getGuildLink: (arg0: string) => string
    name: string
}> = new Set([
    {
        colour: "var(--colour-blue)",
        domain: RegionEnum.EU,
        getGuildLink: guildName => composeGuildLink("naeu", "en-US", guildName, RegionEnum.EU),
        name: "Europe",
    },
    {
        colour: "var(--colour-red)",
        domain: RegionEnum.NA,
        getGuildLink: guildName => composeGuildLink("naeu", "en-US", guildName, RegionEnum.NA),
        name: "North America",
    },
    {
        colour: "var(--colour-orange)",
        domain: RegionEnum.SA,
        getGuildLink: guildName => composeGuildLink("sa", "pt-BR", guildName, RegionEnum.SA),
        name: "South America",
    },
])

export default supportedServers
