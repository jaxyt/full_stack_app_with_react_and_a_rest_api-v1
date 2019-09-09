import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Form from './Form';

export default class UpdateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        unauthorized: [],
        courseDetail: [],
        errors: [],
    }

    componentWillMount() {
        this.display();
    }


    render() {
        const { firstName, lastName } = this.props.context.authenticatedUser;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            unauthorized,
            errors,
        } = this.state;
        

        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                   <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Update Course"
                        elements={() => (
                            <div>
                                {unauthorized.length ?
                                    <Redirect to="/forbidden" />
                                :
                                    <div>
                                        <div className="grid-66">
                                            <div className="course--header">
                                                <h4 className="course--label">Course</h4>
                                                <div>
                                                    <input
                                                        id="title"
                                                        className="input-title course--title--input"
                                                        name="title"
                                                        type="text"
                                                        value={title}
                                                        onChange={this.change}
                                                        placeholder="Course Title..." />
                                                </div>
                                                <p>{`By ${firstName} ${lastName}`}</p>
                                            </div>
                                            <div className="course--description">
                                                <div>
                                                    <textarea id="description" name="description" value={description} onChange={this.change} placeholder="Course Description..." ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-25 grid-right">
                                            <div className="course--stats">
                                                <ul className="course--stats--list">
                                                    <li className="course--stats--list--item">
                                                        <h4>Estimated Time</h4>
                                                        <div>
                                                            <input
                                                                id="estimatedTime"
                                                                className="course--time--input"
                                                                name="estimatedTime"
                                                                type="text"
                                                                value={estimatedTime}
                                                                onChange={this.change}
                                                                placeholder="Hours" />
                                                        </div>
                                                    </li>
                                                    <li className="course--stats--list--item">
                                                        <h4>Materials Needed</h4>
                                                        <div>
                                                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={this.change} placeholder="List Materials..."></textarea>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                }
                            </div>
                            
                        )} /> 
                </div>
                
            </div>
        );
    }

    display = () => {
        const { context, match } = this.props;
        context.data.getCourse(match.params.id)
            .then(currentCourse => {
                if (currentCourse.User.id === context.authenticatedUser.id) {
                    const course = [{ ...currentCourse }];
                    this.setState(() => {
                        return {
                            courseDetail: course,
                            title: course[0].title,
                            description: course[0].description,
                            estimatedTime: course[0].estimatedTime,
                            materialsNeeded: course[0].materialsNeeded,
                            userId: course[0].User.id,
                        };
                    });
                } else {
                    this.setState(() => {
                        return {
                            unauthorized: ["The post you are attempting to modify is owned by a different user"],
                        };
                    });
                }
                
            })
        return;
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context, match } = this.props;
        const { emailAddress, password } = context.authenticatedUser;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
        } = this.state;

        // Updated course payload
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
        };

        context.data.updateCourse(match.params.id, course, emailAddress, password)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    console.log(`${emailAddress}: your course has been successfully updated`)
                    this.props.history.push('/');
                }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('/error');
            })
    }

    cancel = () => {
        this.props.history.push('/');
    }
}