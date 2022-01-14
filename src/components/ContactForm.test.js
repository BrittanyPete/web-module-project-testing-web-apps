import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText(/Contact Form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName, 'edd');
    const errorMessage = 'Error: firstName must have at least 5 characters.'
    const output = screen.queryByText(errorMessage);
    expect(output).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole('button');
    userEvent.click(button)

    await waitFor(async () => {
        const errors = screen.getAllByTestId('error');
        expect(errors).toHaveLength(3);
    });

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName, 'Edward');
    const lastName = screen.getByPlaceholderText(/Burke/i);
    userEvent.type(lastName, 'Burke');
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(async () => {
        const errors = screen.getAllByTestId('error');
        expect(errors).toHaveLength(1);
    });

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName, 'Edward');
    const lastName = screen.getByPlaceholderText(/Burke/i);
    userEvent.type(lastName, 'Burke');
    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(email, 'abc@gmail');
    const errorMessage = 'Error: email must be a valid email address.';
    const output = screen.queryByText(errorMessage);
    expect(output).toBeInTheDocument();


});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const button = screen.getByRole('button');
    userEvent.click(button)

    await waitFor(async () => {
        const errorMessage = 'Error: lastName is a required field.';
        const output = screen.queryByText(errorMessage);
        expect(output).toBeInTheDocument();
    })

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
});