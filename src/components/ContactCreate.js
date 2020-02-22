import React from 'react';
import PropTypes from 'prop-types';

export default class ContactCreate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            phone: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        //여기서 target.name 은 input속성에 name에 정의된 값을 말한다.
        //따라서 이거 하나만 작성해두면 name과 phone에 해당하는 각각의 값들이 수정될 수 있다.
        //두개 이상의 값을 SetState를 하고 싶을 때는 이런식으로 하면 된다.
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClick() {
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        };
        //부모 컴포넌트에게서 전달받은 props로 함수를 전달받아 실행시키고 있다.
        this.props.onCreate(contact);

        this.setState({
            name: '',
            phone: ''
        })
    }

    render(){
        return (
            <div>
                <h2>Create contact</h2>
                <p>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                    />
                </p>
                <button onClick={this.handleClick}>create</button>
            </div>
            

        );
    }
}

ContactCreate.propTypes = {
    onCreate: PropTypes.func
};

ContactCreate.defaultProps = {
    onCreate: () => { console.log('onCreate is not defined'); }
}