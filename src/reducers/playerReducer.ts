type PlayerAction = 
    | { type: 'TAKE_DAMAGE', payload: number }
    | { type: 'GAIN_EXPERIENCE'}
    | { type: 'LEVEL_UP', payload: {skill: keyof PlayerProfile, increase: number}}


export interface PlayerProfile {
    [key: string]: number,
    // profile stats
}

export const initialPlayerProfile: PlayerProfile = {
    level: 1,
    exp: 0,
    healthMax: 10,
    healthCurrent: 10,
    strength: 1,
    accuracy: 1,
    evasion: 1,
}

const playerReducer = (state: PlayerProfile = initialPlayerProfile, action: PlayerAction): PlayerProfile => {
    switch (action.type) {
        case 'TAKE_DAMAGE':
            return {...state, healthCurrent: state.healthCurrent - action.payload}
        case 'GAIN_EXPERIENCE':
            return {...state, exp: state.exp + 200}
        case 'LEVEL_UP':
            console.log(action.payload.skill)
            if (action.payload.skill === 'healthMax') return {...state, healthMax: state.healthMax + action.payload.increase, healthCurrent: state.healthCurrent + action.payload.increase}

            return {...state, [action.payload.skill]: state[action.payload.skill] + action.payload.increase}

        

        default:
            return state
    }
}
export default playerReducer