import { fireEvent, render, screen } from "@testing-library/react";
import { Dialog } from './Dialog';

describe('Dialog component', () => {
  it('should render title', () => {
    render(<Dialog title={'dialog title'} />);

    const title = screen.getByText('dialog title');

    expect(title).toBeInTheDocument();
  });

  it('should call onClose handler after clicking Close button', () => {
    const onClose = jest.fn();

    render(<Dialog onClose={onClose} />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton)

    expect(onClose).toBeCalled();
  });

  it('should close dialog after clicking Close button', () => {
    render(<Dialog />);

    let dialog = screen.queryByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    dialog = screen.queryByRole('dialog');
    expect(dialog).toBeNull();
  })
});