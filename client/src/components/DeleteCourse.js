import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

export default class DeleteCourse extends Component {
    state = {
        errors: [],
    };

    componentDidMount() {
        this.display();
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                {errors.length ?
                    <Redirect to="/forbidden" />
                :
                    <div>Your course has been successfully deleted <Link className="button" to="/">Return Home</Link></div>
                }
            </div>
            
        );
    };
    
    display = () => {
        const { context, match } = this.props;
        context.data.getCourse(match.params.id)
            .then(currentCourse => {
                if (currentCourse.User.id !== context.authenticatedUser.id) {
                    this.setState(() => {
                        return {
                            errors: ["The post you are attempting to modify is owned by a different user"],
                        };
                    });
                } else {
                    return context.actions.removeCourse(match.params.id);
                }
                
            })
        return;
    }
    
}