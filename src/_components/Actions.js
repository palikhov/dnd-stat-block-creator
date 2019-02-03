import React from 'react';
import Row from './Row';
import Input from './Input';
import Column from './Column';
import Textarea from './Textarea';
import SelectField from './SelectField';
import AttackForm from './AttackForm';

class Actions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Title',
      content: 'Content'
    }
  }

  renderActions() {
    return this.props.actions.map((action, i) => {
      if (!action.attack) {
        return (
          <div className='feature-block' key={i} >
          <button className='delete-btn' onClick={() => this.props.deleteAction(action.id)}>
            x
          </button>

            <Row >
              <Column className='col-4'>
                <Input
                  type='text'
                  label={'Title'}
                  placeholder={''}
                  value={action.title}
                  fieldName='title'
                  onChange={(e) => this.props.updateAction(e, action.id)}
                />
              </Column>
              <Column className='col-8'>
                <Textarea
                  type='text'
                  label={'Content'}
                  placeholder={''}
                  value={action.content}
                  fieldName='content'
                  rows={3}
                  onChange={(e) => this.props.updateAction(e, action.id)}
                />
              </Column>
            </Row>
          </div>

        )

      }

      if (action.attack) {
        return (
          <AttackForm action={action} key={i} updateAction={this.props.updateAction} deleteAction={this.props.deleteAction} />
        )
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.renderActions()}
        <button type="button" className="btn btn-primary" onClick={() => this.props.addAction('General')}>Add Action</button>
        <button
          type="button"
          className="btn btn-primary ml-2"
          onClick={() => this.props.addAction('Melee')}
        >
          Add Melee Attack
        </button>
        <button
          type="button"
          className="btn btn-primary ml-2"
          onClick={() => this.props.addAction('Ranged')}
        >
          Add Ranged Attack
        </button>
      </React.Fragment>
    );
  }
}

export default Actions;