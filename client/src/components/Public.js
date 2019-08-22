import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Public extends Component {
    state = {
        courses: [],
    }

    componentDidMount() {
        this.display();
    }

    render() {
        const {
            courses,
        } = this.state;

        return (
            <div className="bounds">
                {courses.map(course => (
                    <div className="grid-33" key={course.id}>
                        <Link className="course--module course--link" to={`/courses/${course.id}`}>
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        );
    }

    display = () => {
        const { context } = this.props;
        context.actions.allCourses()
            .then(totalCourses => {
                this.setState(() => {
                    return {
                        courses: totalCourses,
                    };
                });
            })
    }
}