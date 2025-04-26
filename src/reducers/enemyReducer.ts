type EnemyAction = 
    | { type: 'NEXT_ENEMY' }
    | { type: 'TAKE_DAMAGE', payload: number }

interface EnemyProfile {
    [key: string]: number,
}

export const initialEnemyProfile: EnemyProfile = {
    healthMax: 10,
    healthCurrent: 10,
}

const enemyReducer = (state: EnemyProfile = initialEnemyProfile, action: EnemyAction): EnemyProfile => {
    switch (action.type) {
        case 'TAKE_DAMAGE':
            return {...state, healthCurrent: state.healthCurrent - action.payload}
        case 'NEXT_ENEMY':
            return { healthMax: 10, healthCurrent: 10 }
        default:
            return state
    }
}
export default enemyReducer