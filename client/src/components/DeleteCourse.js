import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DeleteCourse extends Component {
    state = {
        error: '',
    };

    render() {
        const { context, match } = this.props;
        const { emailAddress, password } = context.authenticatedUser;
        context.actions.removeCourse(match.params.id, emailAddress, password);
        return (
            <Link className="button" to="/">Return Home</Link>
        );
    };
    
    
}