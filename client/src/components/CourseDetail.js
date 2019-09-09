import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {
    state = {
        courseDetail: [],
    }

    componentDidMount() {
        this.display();
    }

    render() {
        const {
            courseDetail,
        } = this.state;

        return (
            <div>
                {courseDetail.map(course => (
                    <div key={course.User.id}>
                        <div className="actions--bar">
                            <div className="bounds">
                                <div className="grid-100">
                                    <span>
                                        <Link className="button" to={`/courses/update/${course.id}`}>Update Course</Link>
                                        <Link className="button" to={`/courses/delete/${course.id}`}>Delete Course</Link>
                                        <Link className="button button-secondary" to="/">Return to List</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bounds course--detail">
                            <div className="grid-66">
                                <div className="course--header">
                                    <div className="course--label">Course</div>
                                    <div className="course--title">{course.title}</div>
                                    <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>
                                </div>
                                <div className="course--description">{course.description}</div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <h3>{course.estimatedTime}</h3>
                                        </li>
                                        <li className="course--stats--list-item">
                                            <h4>Materials Needed</h4>
                                            <ul>{course.materialsNeeded}</ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    display = () => {
        const { context, match } = this.props;
        context.data.getCourse(match.params.id)
            .then(currentCourse => {
                const course = [{ ...currentCourse }];
                this.setState(() => {
                    return {
                        courseDetail: course,
                    };
                });
            })
        return;
    }

}