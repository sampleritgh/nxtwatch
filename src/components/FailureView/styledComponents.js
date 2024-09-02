import styled from 'styled-components'

// Container for the failed view
export const FailedView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
`

// Image for the failed view
export const FailedImage = styled.img`
  width: 200px;

  @media screen and (min-width: 768px) {
    width: 450px;
  }
`

// Retry button styling

// Heading for the failed view
export const FailedHeading = styled.h1`
  font-family: 'Roboto';
  font-size: 25px;
  color: ${props => props.headingColor};
  text-align: center;
`

// Note for the failed view
export const FailedNote = styled.p`
  font-family: 'Roboto';
  font-size: 18px;
  color: ${props => props.noteColor};
  text-align: center;
  background-color: #4f46e5;
`

export const RetryButton = styled.button`
  border: none;
  background-color: #4f46e5;
  border-radius: 3px;
  color: #ffffff; /* corrected from "tff-P" to "#fff" for white text */
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: 'Roboto';
  font-size: 15px;
`
