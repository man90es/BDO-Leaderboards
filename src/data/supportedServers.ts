type RegionId =  "EU" | "NA" | "SA"

function composeGuildLink(subdomain: string, locale: string, guildName: string, region: RegionId) {
    const query = new URLSearchParams({ guildName, region })

    return `https://www.${subdomain}.playblackdesert.com/${locale}/Adventure/Guild/GuildProfile?` + query
}

const supportedServers: Set<{
    colour: string
    domain: RegionId
    getGuildLink: (arg0: string) => string
    name: string
}> = new Set([
    {
        colour: "var(--colour-blue)",
        domain: "EU",
        getGuildLink: guildName => composeGuildLink("naeu", "en-US", guildName, "EU"),
        name: "Europe",
    },
    {
        colour: "var(--colour-red)",
        domain: "NA",
        getGuildLink: guildName => composeGuildLink("naeu", "en-US", guildName, "NA"),
        name: "North America",
    },
    {
        colour: "var(--colour-orange)",
        domain: "SA",
        getGuildLink: guildName => composeGuildLink("sa", "pt-BR", guildName, "SA"),
        name: "South America",
    },
])

export default supportedServers
