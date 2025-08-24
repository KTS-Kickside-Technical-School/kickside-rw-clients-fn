
export interface StandingsTeam {
    team: string;
    P: number; // Played
    W: number; // Wins
    D: number; // Draws
    L: number; // Losses
    GF: number; // Goals For
    GA: number; // Goals Against
    GD: number; // Goal Difference
    Pts: number; // Points
}

export const calculateStandings = (matches: any[]): StandingsTeam[] => {
    const standings: Record<string, StandingsTeam> = {};

    matches.forEach((m) => {
        if (m.status !== 'finished') return; // Only finished matches count

        const home = m.homeTeam.name;
        const away = m.awayTeam.name;
        const homeScore = m.homeScore;
        const awayScore = m.awayScore;

        if (!standings[home]) standings[home] = { team: home, P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0 };
        if (!standings[away]) standings[away] = { team: away, P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0 };

        standings[home].P += 1;
        standings[away].P += 1;

        standings[home].GF += homeScore;
        standings[home].GA += awayScore;
        standings[away].GF += awayScore;
        standings[away].GA += homeScore;

        standings[home].GD = standings[home].GF - standings[home].GA;
        standings[away].GD = standings[away].GF - standings[away].GA;

        if (homeScore > awayScore) {
            standings[home].W += 1;
            standings[away].L += 1;
            standings[home].Pts += 3;
        } else if (homeScore < awayScore) {
            standings[away].W += 1;
            standings[home].L += 1;
            standings[away].Pts += 3;
        } else {
            standings[home].D += 1;
            standings[away].D += 1;
            standings[home].Pts += 1;
            standings[away].Pts += 1;
        }
    });

    return Object.values(standings).sort(
        (a, b) => b.Pts - a.Pts || b.GD - a.GD || b.GF - a.GF
    );
};
