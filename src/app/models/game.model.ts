
import { Player, GameTemplate, User } from './'

export class Game {

    public _id: string
    public createdBy: { _id: string, name: string }
    public gameTemplate: GameTemplate
    public createdOn: string
    public startedOn: string
    public endedOn: string
    public state: 'open' | 'started' | 'ended'
    public minPlayers: number
    public maxPlayers: number
    public players: Player[]

    constructor(json = null) {
        this._id = json._id
        this.createdBy = json.createdBy
        this.gameTemplate = new GameTemplate(json.gameTemplate)
        this.createdOn = json.createdOn
        this.startedOn = json.startedOn
        this.endedOn = json.endedOn
        this.state = json.state
        this.minPlayers = json.minPlayers
        this.maxPlayers = json.maxPlayers

        this.players = []

        for (let i in json.players) {
            if (!json.players.hasOwnProperty(i)) {
                continue
            }

            this.players.push(new Player(json.players[i]))
        }
    }

    addPlayers(players: Player[]) {
        this.players = players
    }

    hasState(state: string) {
        return this.state === state
    }

    canView() {
        return !this.hasState('open')
    }

    canJoin(user: User) {
        if (!this.hasState('open')) {
            return false
        }

        if (this.players.length >= this.maxPlayers) {
            return false
        }

        for (const player of this.players) {
            if (player.name === user.username) {
                return false
            }
        }

        return true
    }

    playerCount() {
        return this.players.length
    }
}