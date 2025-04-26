import React, { useEffect, useReducer, useState } from "react"
import notationReducer, { initialNotationInfo } from "../reducers/notationReducer"
import playerReducer, { initialPlayerProfile, PlayerProfile } from "../reducers/playerReducer"
import enemyReducer, { initialEnemyProfile } from "../reducers/enemyReducer"


const DiceRoll: React.FC = () => {
    const [locationSetting, setLocationSetting] = useState()


    const [notationInfo, dispatchNotationInfo] = useReducer(notationReducer, initialNotationInfo)
    const [playerProfile, dispatchPlayerProfile] = useReducer(playerReducer, initialPlayerProfile)
    const [enemyProfile, dispatchEnemyProfile] = useReducer(enemyReducer, initialEnemyProfile)

    const [profileVisibility, setProfileVisibility] = useState<boolean>(false)
    const [levelUpVisibility, setLevelUpVisibility] = useState<boolean>(false)

    const [playerTurn, setPlayerTurn] = useState<boolean>(true)

    const [diceRollPurpose, setDiceRollPurpose] = useState<string>("Waiting")
    const [diceRollResult, setDiceRollResult] = useState<number>(0)




    
    const diceSetting = (diceNotation: number, setResult: boolean): number | void => {
        const diceRoll = Math.floor(Math.random() * diceNotation) + 1
        if (!setResult) return diceRoll
        setDiceRollResult(diceRoll)
    }
    

    const toggleProfile = (): void => {
        setProfileVisibility(!profileVisibility)
    }

    const activateLevelUp = (): void => {
        setLevelUpVisibility(true)
    }

    const levelUpSkill = (selectedSkill: string): void => {
        dispatchPlayerProfile({ 
            type: 'LEVEL_UP', payload: {
                skill: selectedSkill === 'health'? `${selectedSkill}Max`: selectedSkill  as keyof PlayerProfile, 
                increase: diceSetting(notationInfo.skills[selectedSkill], false) as number
            }
        })
        setLevelUpVisibility(false)
    }

    const handleDownedEnemy = ():void => {
        dispatchPlayerProfile({ type: 'GAIN_EXPERIENCE'})
        dispatchEnemyProfile({ type: 'NEXT_ENEMY'})
    }





    const setAttack = (): void => {
        diceSetting(6, true)
        setDiceRollPurpose("Attack")
    }

    const setDefend = (): void => {
        diceSetting(6, true)
        setDiceRollPurpose("Defend")
    }

    const defaultDiceRollPurpose = (): void => {
        setDiceRollPurpose("Waiting")
    }

    useEffect(() => {
        switch (diceRollPurpose) {
            
            case "ToHit": 
                diceSetting(100,false) as number < notationInfo.base.to_hit ? playerTurn ? setAttack() : setDiceRollPurpose("TakeDamage") : defaultDiceRollPurpose()
                break;
            case "Attack":
                console.log("hit")
                dispatchEnemyProfile({ type: 'TAKE_DAMAGE', payload: diceRollResult * playerProfile.strength })
                setDiceRollPurpose("CheckEnemy")
                break;
            case "Defend":
                const damageTotal = diceSetting(6, false) as number - diceRollResult
                if (damageTotal > 0) dispatchPlayerProfile({ type: 'TAKE_DAMAGE', payload: damageTotal })
                defaultDiceRollPurpose()
                break;
            case "TakeDamage":
                dispatchPlayerProfile({ type: 'TAKE_DAMAGE', payload: diceSetting(6, false) as number })
                defaultDiceRollPurpose()
                break;
            case "CheckEnemy":
                if (enemyProfile.healthCurrent <= 0) handleDownedEnemy() 
                defaultDiceRollPurpose()
                break;
            default:
                defaultDiceRollPurpose()
                break;
        }
    }, [diceRollPurpose])





    return (
        <div style={{
            'height': '100dvh',
            'display': 'flex',
            'justifyContent': 'space-between',
        }}>
            <section style={{
                'width': '30dvw',
                'display': 'flex',
                'flexDirection': 'column',
                'justifyContent': 'space-between',
            }}>
                <div style={{
                    'border': 'solid blue',
                }}>
                    <h1>Dice Box</h1>
                </div>
                <div>
                    <h3>Dice result</h3>
                    <h2>{diceRollResult}</h2>
                    <button onClick={() => {diceSetting(100, true)}}>Roll Dice</button>
                </div>
                <div style={{
                    'border': 'solid blue',
                }}>
                    <button onClick={toggleProfile}>Profile</button>
                </div>
            </section>
            <section style={{
                'width': '70dvw',
                'display': 'flex',
                'flexDirection': 'column',
                'justifyContent': 'space-evenly',
            }}>
                <div style={{
                    'display': 'flex',
                    'justifyContent': 'space-between',
                    'padding': '40px',
                }}>
                    <div>
                        <h2>PC</h2>
                        <p>{playerProfile.healthCurrent + '/' + playerProfile.healthMax}</p>
                    </div>
                    <div>
                        <h2>Enemy</h2>
                        <p>{enemyProfile.healthCurrent + '/' + enemyProfile.healthMax}</p>
                    </div>
                </div>
                <div>
                    <h1>Action Board</h1>
                    <button onClick={() => {setDiceRollPurpose("ToHit")}}>Attack</button>
                    <button onClick={setDefend}>Defend</button>
                    <button>Reset Action</button>
                </div>
                <div>
                    <h2>Testing Buttons</h2>
                    <button onClick={()=> {}}>Test Function 1</button>
                    <button onClick={() => {}}>Test Function 2</button>
                </div>

                
                <section style={{
                    'display': profileVisibility? "block" : "none",
                    'position': 'fixed',
                    'top' : '50%', 
                    'left' : '50%',
                    'transform' : 'translate(-50%, -50%)',
                    'background': 'gray',
                    'border': 'solid red',
                    'padding': '35px',
                }}>
                    <h1>Level {playerProfile.level}</h1>
                    <span>EXP: {playerProfile.exp}</span>
                    <div>
                        <div style={{
                            'display': 'flex',
                            'justifyContent': 'space-evenly',
                        }}>
                            <h2>Health - {playerProfile.healthMax}</h2> 
                            <button style={{'display': levelUpVisibility? "block" : "none",}} onClick={()=> {levelUpSkill("health")}}>Up</button>

                        </div>
                        <div style={{
                            'display': 'flex',
                            'justifyContent': 'space-evenly',
                        }}>
                            <h2>Strength - {playerProfile.strength}</h2> 
                            <button style={{'display': levelUpVisibility? "block" : "none",}} onClick={()=> {levelUpSkill("strength")}}>Up</button>

                        </div>
                        
                    </div>
                    <div>
                        <button onClick={toggleProfile}>Close</button>
                        <button onClick={activateLevelUp}>Level Up</button>
                    </div>
                </section>
            </section>


            
        </div>
    )
}
export default DiceRoll