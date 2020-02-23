import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: '',
            selectedKey: -1,
            contactData: [{
                name : 'abert',
                phone : '010-1111-2222'
            },{
                name : 'lisa',
                phone : '010-1111-2223'
            },{
                name : 'jenny',
                phone : '010-1111-2224'
            },{
                name : 'betty',
                phone : '010-1111-2225'
            }
            ],
        };

        //임의의 메소드를 만드려면 꼭 바인딩을 해주어야 한다.
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    handleClick(key) {
        this.setState({
            selectedKey : key
        });
    }

    handleCreate(contact){
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] })
        });
    }

    handleRemove() {
        if(this.state.selectedKey < 0) return;
        this.setState({
            contactData: update(this.state.contactData, 
                { $splice: [[this.state.selectedKey, 1]]}
            ),
            selectedKey : -1,
        });
    }

    handleEdit(name, phone) {
        this.setState({
            contactData: update(this.state.contactData,
                { 
                    [this.state.selectedKey]: {
                        name : { $set: name },
                        phone : { $set: phone },
                    }
                }
            )
        });
    }

    componentWillMount() {
        const contactData = localStorage.contactData;

        if(contactData) {
            this.setState({
                contactData :JSON.parse(contactData)
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //이렇게 하면 서버를 다시 시작해도 내 로컬에 저장되어있는 데이터로 보여주게 된다.
        //되돌리고 싶으면 localstorage.clear(); 를 브라우저의 개발자 콘솔에서 해주면 된다.
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)){
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }


    render(){
        const mapToComponent = (data) => {
            data.sort((a,b)=>{
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
               });
            data = data.filter((contact)=>{
                return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
            });
            return data.map((contact, i) => {
                return (
                    <ContactInfo 
                        contact={contact} 
                        key={i}
                        onClick={() => this.handleClick(i)}
                        />
                        //우리가 직접 만든 컴포넌트에는 onclick 함수가 적용되지 않는다 그래서 상위 컴포넌트에서
                        //div태그로 감싼다음에 onclick속성을 props로 전달해 주어야만 onClick 함수를 적용시킬 수 있다
                        //또한 onClick에 arrow func으로 하지 않고 그냥 this.handleClick(i) 이렇게 넘겨주면 클릭하는 순간이 아니라 계속 함수가 실행되게 된다.
                        //그래서 렌더링 되는 동안 함수가 계속 무한반복 실행되게 되고 계속 setState가 불리면서 또 렌더링이 반복될 것이다. 주의하자

                );
            })
        }

        return(
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />

                <div>{mapToComponent(this.state.contactData)}</div>
                <ContactDetails 
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}/>
                <ContactCreate
                    onCreate={this.handleCreate}
                />
            </div>            
        );
    }
}