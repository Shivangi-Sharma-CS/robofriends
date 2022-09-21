import React, {Component} from 'react';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll.js'
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';


class App extends Component {

    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ""
        }
    }

    // since this is a React component, we are not using arrow functions here
    // Lifecycle Hooks
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}));
    }

    // We could pass the event as the argument because of the onChange HTML
    // property of SearchField provided at the time of component creation
    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
    }

    render() {
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        return !robots.length ?
            <h1>Loading</h1> :
             (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} /> {/* HTML select tag onChange=myFunction()   */}
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }
}

export default App;