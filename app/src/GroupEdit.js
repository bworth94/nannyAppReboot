import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

//setting state props and values and binding with handleChange and handleSubmit

class GroupEdit extends Component {

  emptyItem = {
    task: '',
    timeDue: '',
    parentNotes: '',
    nannyNotes: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Using fetch to communicate with the API

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const group = await (await fetch(`/api/group/${this.props.match.params.id}`)).json();
      this.setState({item: group});
    }
  }

  //setting parameters for handleChange

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  //using fetch to communicate with api
  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/group', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/groups');
  }

  //rendering for the front end
  
  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Make Notes' : 'Add Task'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="task">Task</Label>
            <Input type="text" name="task" id="task" value={item.task || ''}
                   onChange={this.handleChange} autoComplete="task"/>
          </FormGroup>
          <FormGroup>
            <Label for="timeDue">Time Due</Label>
            <Input type="text" name="timeDue" id="timeDue" value={item.timeDue || ''}
                   onChange={this.handleChange} autoComplete="timeDue-level1"/>
          </FormGroup>
          <FormGroup>
            <Label for="parentNotes">Parent Notes</Label>
            <Input type="text" name="parentNotes" id="parentNotes" value={item.parentNotes || ''}
                   onChange={this.handleChange} autoComplete="parentNotes"/>
          </FormGroup>
            <FormGroup>
                <Label for="nannyNotes">Nanny Notes</Label>
                <Input type="text" name="nannyNotes" id="nannyNotes" value={item.nannyNotes || ''}
                        onChange={this.handleChange} autoComplete="nannyNotes"/>
            </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="danger" tag={Link} to="/groups">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(GroupEdit);