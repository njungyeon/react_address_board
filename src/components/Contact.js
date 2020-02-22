import React from 'react';
import ContactInfo from './ContactInfo';

export default class Contact extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            contactData: [{
                name : 'abert',
                phone : '010-1111-2222'
            },{
                name : 'betty',
                phone : '010-1111-2223'
            },{
                name : 'jenny',
                phone : '010-1111-2224'
            },{
                name : 'lisa',
                phone : '010-1111-2225'
            }
            ],
        };
    }
    render(){
        const mapToComponent = (data) => {
            return data.map((contact, i) => {
                return (
                    <ContactInfo contact={contact} key={i}/>
                );
            })
        }

        return(
            <div>
                {mapToComponent(this.state.contactData)}
            </div>            
        );
    }
}