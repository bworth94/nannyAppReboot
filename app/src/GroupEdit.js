import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

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

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const group = await (await fetch(`/api/group/${this.props.match.params.id}`)).json();
      this.setState({item: group});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

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
            <div className="row">
            <FormGroup className="col-md-5 mb-3">
              <Label for="country">Country</Label>
              <Input type="text" name="country" id="country" value={item.country || ''}
                     onChange={this.handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="country">Postal Code</Label>
              <Input type="text" name="postalCode" id="postalCode" value={item.postalCode || ''}
                     onChange={this.handleChange} autoComplete="address-level1"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(GroupEdit);