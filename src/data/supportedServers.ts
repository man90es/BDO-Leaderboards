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
    className: string
    domain: RegionEnum
    getGuildLink: (arg0: string) => string
    name: string
}> = new Set([
    {
        className: "bs-button-blue",
        domain: RegionEnum.EU,
        getGuildLink: guildName => composeGuildLink("naeu", "en-US", guildName, RegionEnum.EU),
        name: "Europe",
    },
    {
        className: "bs-button-red",
        domain: RegionEnum.NA,
        getGuildLink: guildName => composeGuildLink("naeu", "en-US", guildName, RegionEnum.NA),
        name: "North America",
    },
    {
        className: "bs-button-orange",
        domain: RegionEnum.SA,
        getGuildLink: guildName => composeGuildLink("sa", "pt-BR", guildName, RegionEnum.SA),
        name: "South America",
    },
])

export default supportedServers
