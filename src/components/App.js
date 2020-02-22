import React from 'react';
import { hot } from 'react-hot-loader'
import Contact from './Contact';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
        }
    }
    render(){
        return(
            // <div>
            //     <button onClick={() => {this.setState({name: 'njy'}) }}>clickme</button>
            //     <h1>hello!@@@!! {this.state.name}</h1>
            // </div>
            <Contact></Contact>
            
        );
    }
}

// export default App; react-hot-loader 적용하려면 이렇게 해야하는거로 바뀜
export default hot(module)(App);