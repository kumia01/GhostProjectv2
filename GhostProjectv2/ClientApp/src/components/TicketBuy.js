import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom';
import {Row, Col, Form, FormGroup, Label} from 'reactstrap';







export class TickerBuy extends Component {
  static displayName = TickerBuy.name;
  constructor(props){
    super(props)
  }

  render () {
    return (
        <div>
            <Row>
                <Col>
                    <Form>
                        <FormGroup>
                            <Label for='ticker'>
                                Aksje kjøp
                            </Label>
                            <Input for='ticker' />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </div>
    );
  }
}