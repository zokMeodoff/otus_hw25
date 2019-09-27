import React, { Component } from 'react'
import CourseCard from './CourseCard'

import axios from 'axios';

class CoursesComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            loaded: false,
            errors: []
        }
    }

    async componentDidMount() {
        let courses = await axios.get('/api/courses');
        this.setState({courses: courses, loaded: true})
    }

    render() {
        if (this.state.loaded) {
            return (
            	<div className="container">
				    <h2 className="h">Популярные курсы</h2>
				    <div className="row row_justify_space-between">
                        {
                            this.state.courses.map((course) =>
                                <CourseCard
                                    course={course}
                                    key={course.name}
                                />
                            )
                        }
				</div>
			</div>
            )
        } else {
            return (
                <div className="container">
                    <div className="row row_justify_space-between">
                        <h2>Загрузка списка курсов...</h2>
                    </div>
                </div>
            )
        }
    }
}

export default CoursesComponent;