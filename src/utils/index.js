export function capitalise(string) {
    return string ? string[0].toUpperCase() + string.slice(1) : ""
}

function composeGuildLink(subdomain, locale, guildName, region) {
    const query = new URLSearchParams({ guildName, region })

    return (
        `https://www.${subdomain}.playblackdesert.com/${locale}/Adventure/Guild/GuildProfile?${query}`
    )
}

export const supportedServers = new Set([
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
