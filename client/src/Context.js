import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';


const Context = React.createContext();

export class Provider extends Component {

    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    };

    constructor() {
        super();
        this.data = new Data();
    }

    render() {
        const { authenticatedUser } = this.state;

        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
                allCourses: this.allCourses,
            },
        };

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
        const userCreds = { ...user, password };
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: userCreds,
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify(userCreds), { expires: 1 });
        }
        return user
    }

    signOut = () => {
        this.setState(() => {
            return {
                authenticatedUser: null
            };
        });
        Cookies.remove('authenticatedUser');
    }

    allCourses = async () => {
        const courses = await this.data.getCourses();
        return courses;
    }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}