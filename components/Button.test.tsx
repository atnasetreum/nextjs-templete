/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  let component: any;
  const title = 'hola mundo';
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(<Button title={title} handleClick={mockHandler} />);
  });
  test('Render with title', () => {
    //expect(component.container).toHaveTextContent(title);
    component.getByText(title);
    // component.debug(); // mostrar que esta renderizando
  });

  test('Click', () => {
    const button = component.getByText(title);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });

  test('Styles', () => {
    const el = component.getByText(title);
    expect(el).toHaveStyle('fontSize: 30px');
  });
});
