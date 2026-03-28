import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../app/components/ui/button';

describe('Button', () => {
  it('renders with default styles', () => {
    render(<Button>Click</Button>);
    const btn = screen.getByRole('button', { name: /click/i });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain('bg-primary');
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="outline" size="lg">
        Outline
      </Button>,
    );
    const btn = screen.getByRole('button', { name: /outline/i });
    expect(btn.className).toContain('border');
    expect(btn.className).toContain('h-10');
  });

  it('calls onClick when clicked', () => {
    const handle = jest.fn();
    render(<Button onClick={handle}>Click me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(btn);
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('forwards props to child when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>,
    );

    const link = screen.getByRole('link', { name: /link/i });
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveAttribute('data-slot', 'button');
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button', { name: /disabled/i });
    expect(btn).toBeDisabled();
  });
});
