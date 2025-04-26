type NotationFetch = 
    | { type: 'HEALTH_NOTATION'}

export interface NotationInfo {
    base: {
        [key: string]: number,
    },
    // class: {
    skills: {
        [key: string]: number,
    }
}

export const initialNotationInfo: NotationInfo = {
    base: {
        to_hit: 70,
    },
    skills: {
        health: 6,
        strength: 2
    }
    // [
    //     // {
    //     //     type: 'health', 
    //     //     notation: 6,
    //     // },
    //     // {
    //     //     type: 'strength',
    //     //     notation: 2
    //     // }
    // ],
}

const notationReducer = (state: NotationInfo = initialNotationInfo, action: NotationFetch): NotationInfo => {
    switch (action.type) {
        case 'HEALTH_NOTATION':
            return state
    
        default:
            return state
    }
}

export default notationReducer