

const LandingPage: React.FC = () => {

    return (
        <div>
            <h1>Webapp games</h1>
            <h2>Dice Rolling Game</h2>
            <h2>Text-Based Game</h2>
            <h2>Language Learning Enhancement</h2>
            <h2>SQL Murder Mystery</h2>
            <section>
                <div style={
                    {
                        'display': 'grid', 
                        'gridTemplateColumns': '2fr 3fr',
                        'border': 'solid red',
                    }
                }>
                    <div>
                        <img src="https://fakeimg.pl/400x400?text=placeholder" />
                    </div>
                    <div style={{
                        'display': 'flex',
                        'flexDirection': 'column',
                        'justifyContent': 'space-between',
                        'padding': '40px',
                    }}>
                        <div>
                            <h1>Project Title</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quos. Obcaecati magnam quibusdam voluptatibus commodi ipsum. Quasi ipsum ad, vero laboriosam voluptates cumque explicabo, enim quos dignissimos nobis saepe provident?
                       
                            </p>
                        </div>
                        <div>
                            <button>Help/Play</button>
                        </div>
                    </div>

                </div>

            </section>
        </div>
    )
}

export default LandingPage