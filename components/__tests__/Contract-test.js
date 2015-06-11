jest.dontMock('../Contract.js');
jest.dontMock('moment');
// jest.dontMock('tcomb');
// jest.dontMock('tcomb-validation');
// jest.dontMock('tcomb-form');
describe('Contract', function() {
  it('changes the text after click', function() {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    var Contract = require('../Contract.js');

    var contract = TestUtils.renderIntoDocument(
      <Contract />
    );

    // Verify that it's Off by default
    var label = TestUtils.findRenderedDOMComponentWithTag(
      contract, 'label');
    expect(label.getDOMNode().textContent).toEqual('Off');

    // Simulate a click and verify that it is now On
    var input = TestUtils.findRenderedDOMComponentWithTag(
      contract, 'input');
    TestUtils.Simulate.change(input);
    expect(label.getDOMNode().textContent).toEqual('On');
  });
});