import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

//setting state and props

class GroupList extends Component{
    constructor(props) {
        super(props);
        this.state = {groups: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }


    //using fetch to communicate with API

    componentDidMount(){
        this.setState({isLoading: true});

        fetch('api/groups')
            .then(response=> response.json())
            .then(data => this.setState({groups: data, isLoading: false}));
    }

    async remove(id) {
        await fetch('/api/group/${id}', {
            method: 'DELETE', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() =>{
            let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
            this.setState({groups: updatedGroups});
        });
    }

    //Rending everything for the frontend

    render(){
        const {groups, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>
        }

        const groupList= groups.map(group => {
            const timeDue = `${group.timeDue || ''}`;
            const parentNotes = `${group.parentNotes || ''}`;
            const nannyNotes =`${group.nannyNotes || ''}`;
            return <tr key={group.id}>
                <td style={{whiteSpace: 'nowrap'}}>{group.task}</td>
                <td>{timeDue}</td>
                <td>{parentNotes}</td>
                <td>{nannyNotes}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
        return (
            <div>
              <AppNavbar/>
              <Container fluid>
                <div className="float-right">
                  <Button color="primary" tag={Link} to="/groups/new">Add Task</Button>
                </div>
                <h3>Todays Tasks</h3>
                <Table className="mt-4">
                  <thead>
                  <tr>
                    <th width="20%">Task</th>
                    <th width="20%">Time Due</th>
                    <th width="20%">Parent Notes</th>
                    <th width="20%">Nanny Notes</th>
                    <th width="10%">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {groupList}
                  </tbody>
                </Table>
              </Container>
            </div>
          );
        }
      }

      export default GroupList;
