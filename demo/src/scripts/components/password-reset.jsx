var React              = require('react'),
    BS                 = require('react-bootstrap'),
    Input              = BS.Input,
    Button             = BS.Button,
    Panel              = BS.Panel,
    ResponseModalMixin = require('../mixins/response-modal.jsx'),
    FormStateMixin     = require('../mixins/form-state.jsx'),
    Highlight          = require('react-highlight'),
    Auth               = require('../../../../src/j-toker.js');

module.exports = React.createClass({
  mixins: [
    ResponseModalMixin,
    FormStateMixin
  ],

  getInitialState: function() {
    return {
      email: '',
      sent_email: '',
      isModalOpen: false,
      errors: null
    };
  },

  handlePasswordResetClick: function() {
    Auth.requestPasswordReset({
      email: this.state.email
    })
      .then(function()  {
        this.setState({
          sent_email: this.state.email,
          email: '',
          isModalOpen: true,
          errors: null
        });
      }.bind(this))

      .fail(function(resp) {
        this.setState({
          isModalOpen: true,
          errors: resp.data.errors
        });
      }.bind(this));
  },

  successModalTitle: 'Password Reset Request Success',
  errorModalTitle: 'Password Reset Request Error',

  renderSuccessMessage: function() {
    return (
      <p>
        An email was just sent to you at {this.state.sent_email}. Follow the
        instructions contained in the email to gain access to your account.
      </p>
    );
  },

  renderErrorMessage: function() {
    return (
      <p>There was an error: {this.state.errors.join(', ')}</p>
    );
  },

  render: function() {
    return (
      <Panel header='Request Password Reset' bsStyle='info'>
        <form>
          <Input type='email'
                name='email'
                label='Account Email Address'
                placeholder='Enter email...'
                value={this.state.email}
                onChange={this.handleInputChange} />

          <Button className='btn btn-primary'
                  onClick={this.handlePasswordResetClick}>
            Request Password Reset
          </Button>
        </form>

        <br />
        <label>Example</label>
        <Highlight className='javascript'>
          $.auth.requestPasswordReset({'{'}<br />
            &nbsp;&nbsp;email: 'xxx'<br />
          {'}'});
        </Highlight>
      </Panel>
    );
  }
});
