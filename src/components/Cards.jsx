import React from 'react'
import { Card, CardBody, CardText, CardTitle } from 'react-bootstrap'

export const Cards = ({title, text, className}) => {
  return (
    <Card className={className}>
        <CardBody>
            <CardText>{text}</CardText>
            <CardTitle>{title}</CardTitle>
        </CardBody>
    </Card>
  ) 
}
